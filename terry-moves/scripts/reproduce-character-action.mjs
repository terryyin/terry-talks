// Run from terry-moves. Keep the accepted decoded-picture record outside out/.
// node scripts/reproduce-character-action.mjs record|reproduce <record-directory> [browser-executable]
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, unlinkSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { resolve } from 'node:path';
import process from 'node:process';
import console from 'node:console';
import { URL } from 'node:url';

const [operation, directory, suppliedBrowser] = process.argv.slice(2);
if (!['record', 'reproduce'].includes(operation) || !directory) throw new Error('Use record|reproduce <record-directory> [browser-executable]');
const records = resolve(directory);
if (records === resolve('out') || records.startsWith(`${resolve('out')}/`)) throw new Error('Keep accepted records outside generated out/');
mkdirSync(records, { recursive: true });
const takes = [
	{ name: 'original', composition: 'RobotGreeting', output: resolve('out/robot-greeting.mp4') },
	{ name: 'thumbs-up', composition: 'RobotGreetingThumbsUp', output: resolve('out/robot-greeting-thumbs-up.mp4') },
];
const actor = resolve('public/character-action/RobotExpressive.glb');
const assetHash = createHash('sha256').update(readFileSync(actor)).digest('hex');
if (assetHash !== '047f5e5fb3bb6d378bd1df16ca6137f2a596c99b3a1b5690b4020c05aaf6f319') throw new Error('Saved actor identity changed');
const capture = (path) => {
	const probe = JSON.parse(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'stream=codec_name,width,height,pix_fmt,avg_frame_rate,nb_frames,color_space,duration', '-show_entries', 'format=duration', '-of', 'json', path], { encoding: 'utf8' }));
	const decoded = execFileSync('ffmpeg', ['-v', 'error', '-i', path, '-map', '0:v:0', '-f', 'framemd5', '-'], { encoding: 'utf8' });
	const pictures = decoded.split('\n').filter((line) => line && !line.startsWith('#')).map((line) => line.split(',').at(-1).trim());
	if (pictures.length !== Number(probe.streams[0].nb_frames)) throw new Error('Decoded frame sequence is incomplete');
	return { metadata: probe, pictures };
};
const acceptedFile = `${records}/accepted.json`;
if (operation === 'record') {
	if (existsSync(acceptedFile)) throw new Error('Accepted record already exists; preserve it and choose a new record directory');
	writeFileSync(acceptedFile, JSON.stringify({ assetHash, takes: takes.map((take) => ({ ...take, ...capture(take.output) })) }, null, 2) + '\n');
	console.log(`Recorded both accepted picture sequences and metadata: ${acceptedFile}`);
} else {
	const accepted = JSON.parse(readFileSync(acceptedFile, 'utf8'));
	if (accepted.assetHash !== assetHash) throw new Error('Accepted record uses a different actor');
	for (const take of takes) {
		const retained = accepted.takes.find((candidate) => candidate.name === take.name);
		if (!retained || retained.output !== take.output || retained.composition !== take.composition) throw new Error(`Accepted ${take.name} input does not match this checkout`);
	}
	// Resolve the existing CLI's installed renderer rather than adding dependencies.
	const cliRequire = createRequire(import.meta.resolve('@remotion/cli'));
	const { bundle } = cliRequire('@remotion/bundler');
	const { openBrowser, selectComposition, renderMedia } = cliRequire('@remotion/renderer');
	const browserExecutable = resolve(suppliedBrowser ?? 'node_modules/.remotion/chrome-headless-shell/mac-arm64/chrome-headless-shell-mac-arm64/chrome-headless-shell');
	if (!existsSync(browserExecutable)) throw new Error('Supply an already-installed browser executable; reproduction never downloads a browser');
	const serveUrl = await bundle({ entryPoint: resolve('src/index.ts'), outDir: `${records}/bundle` });
	const browser = await openBrowser('chrome', { browserExecutable, chromiumOptions: { gl: 'angle' } });
	const requests = new Set();
	const forbidden = [];
	const interceptionErrors = [];
	const createPage = browser.newPage.bind(browser);
	browser.newPage = async (...args) => {
		const page = await createPage(...args);
		const client = page._client();
		client.on('Fetch.requestPaused', (request) => {
			const url = new URL(request.request.url);
			const local = ['about:', 'data:', 'blob:', 'file:'].includes(url.protocol) || (url.protocol === 'http:' && ['localhost', '127.0.0.1', '[::1]'].includes(url.hostname));
			requests.add(url.href);
			if (!local) forbidden.push(url.href);
			client.send(local ? 'Fetch.continueRequest' : 'Fetch.failRequest', { requestId: request.requestId, ...(!local ? { errorReason: 'BlockedByClient' } : {}) }).catch((error) => interceptionErrors.push(String(error)));
		});
		await client.send('Fetch.enable', { patterns: [{ urlPattern: '*' }] });
		return page;
	};
	const results = [];
	try {
		for (const take of takes) {
			const composition = await selectComposition({ serveUrl, id: take.composition, puppeteerInstance: browser });
			// Only these two attempt-owned generated files are removed. Inputs and
			// accepted decoded hashes remain; no asset acquisition/generator runs.
			if (existsSync(take.output)) unlinkSync(take.output);
			await renderMedia({ serveUrl, composition, puppeteerInstance: browser, outputLocation: take.output, codec: 'h264', pixelFormat: 'yuv420p', colorSpace: 'bt709', concurrency: 1, timeoutInMilliseconds: 60000 });
			const actual = capture(take.output);
			const expected = accepted.takes.find((candidate) => candidate.name === take.name);
			if (JSON.stringify(actual.metadata) !== JSON.stringify(expected.metadata)) throw new Error(`${take.name} metadata, fps or duration changed`);
			if (JSON.stringify(actual.pictures) !== JSON.stringify(expected.pictures)) throw new Error(`${take.name} decoded picture sequence changed`);
			results.push({ name: take.name, matchingPictures: actual.pictures.length, metadata: actual.metadata });
			console.log(`PASS: ${take.name}: all ${actual.pictures.length} decoded pictures, duration and fps reproduce.`);
		}
		if (forbidden.length || interceptionErrors.length) throw new Error(`Network acquisition attempted or interception failed: ${JSON.stringify({ forbidden, interceptionErrors })}`);
		if (![...requests].some((url) => url.endsWith('/character-action/RobotExpressive.glb'))) throw new Error('Reproduction did not request the saved local actor');
		writeFileSync(`${records}/result.json`, JSON.stringify({ assetHash, browserExecutable, acquisition: 'external browser requests blocked; no acquisition or generation command', results, requests: [...requests], forbidden, interceptionErrors }, null, 2) + '\n');
	} finally {
		writeFileSync(`${records}/network.json`, JSON.stringify({ requests: [...requests], forbidden, interceptionErrors }, null, 2) + '\n');
		await browser.close({ silent: true });
	}
}
