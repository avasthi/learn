#!/usr/bin/env node
/**
 * render.mjs — renders Mermaid or raw SVG source to a PNG, via headless Chrome.
 *
 * Used by the mermaid-maker and svg-maker subagents (see ../agents/) to check
 * their own work before returning it: write source, render it here, Read the
 * PNG to look at it, iterate, then return the verified source text — never
 * the PNG itself. The PNG only ever needs to exist long enough to be looked
 * at; write it to the session scratchpad, not into the repo.
 *
 * Usage:
 *   node render.mjs mermaid <source.mmd> <out.png>
 *   node render.mjs svg     <source.svg> <out.png>
 *
 * Prints the resolved PNG path on success (one line, to stdout).
 * On failure, prints the error to stderr and exits non-zero.
 *
 * Why puppeteer-core + a locally installed `mermaid`, instead of the
 * obvious `chrome.exe --headless --screenshot` one-liner:
 *   - Chrome's *new* headless mode (the default since ~132) makes
 *     `--screenshot` + `--virtual-time-budget` unreliable for anything that
 *     renders asynchronously, which Mermaid does. `page.evaluate(...)`
 *     awaiting Mermaid's own render promise is a real completion signal,
 *     not a guessed timeout.
 *   - Mermaid's package is ESM-first, and a `file://` page refuses to load
 *     `<script type="module">` as a cross-origin fetch. `dist/mermaid.min.js`
 *     is a classic IIFE bundle (confirmed by inspection — it ends with
 *     `globalThis["mermaid"] = ...`), and `page.addScriptTag({ path })`
 *     inlines that file's contents as a classic inline <script>, which
 *     sidesteps the file:// module problem entirely.
 * puppeteer-core does not download its own Chromium; it drives the Chrome
 * (or Edge) already installed on this machine, found below.
 */

import { existsSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer-core";

const __dirname = dirname(fileURLToPath(import.meta.url));
const MERMAID_JS = join(__dirname, "node_modules", "mermaid", "dist", "mermaid.min.js");

// Chrome first, Edge as fallback — checked in the order most likely to be a
// full-featured Chromium build. Add more candidates here if a target machine
// installs to a nonstandard location.
const BROWSER_CANDIDATES = [
	"C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
	"C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
	"C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
	"C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
	"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
	"/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
	"/usr/bin/google-chrome",
	"/usr/bin/chromium-browser",
	"/usr/bin/microsoft-edge",
];

function findBrowser() {
	const found = BROWSER_CANDIDATES.find((c) => existsSync(c));
	if (!found) {
		throw new Error(`No Chrome or Edge install found. Checked:\n${BROWSER_CANDIDATES.join("\n")}`);
	}
	return found;
}

/** Wrap SVG markup in a minimal white-background page, measure it, and
 * screenshot exactly its rendered size — no cropping guesswork. */
async function screenshotSvgMarkup(page, svgMarkup, outPath) {
	await page.setContent(
		`<!doctype html><html><body style="margin:0;background:#ffffff;display:inline-block">${svgMarkup}</body></html>`,
	);
	await page.waitForSelector("svg");
	const box = await page.evaluate(() => {
		const svg = document.querySelector("svg");
		const rect = svg.getBoundingClientRect();
		return { width: Math.ceil(rect.width), height: Math.ceil(rect.height) };
	});
	if (!box.width || !box.height) {
		throw new Error("Rendered SVG has zero width or height — check the source's width/height/viewBox.");
	}
	const PAD = 16;
	await page.setViewport({ width: box.width + PAD * 2, height: box.height + PAD * 2, deviceScaleFactor: 2 });
	await page.setContent(
		`<!doctype html><html><body style="margin:0;padding:${PAD}px;background:#ffffff">${svgMarkup}</body></html>`,
	);
	await page.waitForSelector("svg");
	await page.screenshot({ path: outPath });
}

async function renderMermaid(sourcePath, outPath) {
	const source = readFileSync(sourcePath, "utf8");
	const browser = await puppeteer.launch({
		executablePath: findBrowser(),
		headless: true,
		args: ["--no-sandbox", "--disable-gpu"],
	});
	try {
		const page = await browser.newPage();
		await page.setContent("<!doctype html><html><body></body></html>");
		await page.addScriptTag({ path: MERMAID_JS });
		await page.evaluate(() => {
			window.mermaid.initialize({ startOnLoad: false, securityLevel: "strict" });
		});
		// This await IS the completion signal — no timeout guessed anywhere.
		const svg = await page.evaluate(async (src) => {
			const { svg } = await window.mermaid.render("render-target", src);
			return svg;
		}, source);
		await screenshotSvgMarkup(page, svg, outPath);
	} finally {
		await browser.close();
	}
}

async function renderSvg(sourcePath, outPath) {
	const source = readFileSync(sourcePath, "utf8");
	const browser = await puppeteer.launch({
		executablePath: findBrowser(),
		headless: true,
		args: ["--no-sandbox", "--disable-gpu"],
	});
	try {
		const page = await browser.newPage();
		await screenshotSvgMarkup(page, source, outPath);
	} finally {
		await browser.close();
	}
}

const [, , mode, sourceArg, outArg] = process.argv;
if (!["mermaid", "svg"].includes(mode) || !sourceArg || !outArg) {
	console.error("Usage: node render.mjs <mermaid|svg> <source-file> <out.png>");
	process.exit(1);
}

const sourcePath = resolve(sourceArg);
const outPath = resolve(outArg);

try {
	if (mode === "mermaid") {
		await renderMermaid(sourcePath, outPath);
	} else {
		await renderSvg(sourcePath, outPath);
	}
	console.log(outPath);
} catch (err) {
	console.error(err && err.stack ? err.stack : String(err));
	process.exit(1);
}
