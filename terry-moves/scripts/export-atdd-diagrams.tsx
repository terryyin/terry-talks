import { renderToStaticMarkup } from 'react-dom/server';
import { mkdirSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { resolve } from 'node:path';
import { DiagramBoard } from '../src/atdd/Scene';

// The film's existing stack resolves to Chalkboard SE on this production Mac.
// Embed that bold face when available, so the SVG keeps the rendered typography.
// PNG stills remain portable even on a host without this font or FontTools.
const embedFont = () => {
	try {
		const data = execFileSync('python3', ['-c', `
from fontTools.ttLib import TTCollection
from io import BytesIO
import base64
font = TTCollection('/System/Library/Fonts/Supplemental/ChalkboardSE.ttc').fonts[2]
if font['OS/2'].fsType != 0:
    raise ValueError('Font embedding is restricted')
font.flavor = 'woff'
output = BytesIO()
font.save(output)
print(base64.b64encode(output.getvalue()).decode())
`], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
		return `<style>@font-face{font-family:'Chalkboard SE';font-weight:700 900;src:url(data:font/woff;base64,${data}) format('woff')}</style>`;
	} catch {
		return '';
	}
};

const output = resolve(process.cwd(), '../ATDD/diagrams');
mkdirSync(output, { recursive: true });
const font = embedFont();
for (const [diagram, name] of [['tree', 'solution-tree'], ['circle', 'scenario-cycle']] as const) {
	const markup = renderToStaticMarkup(<DiagramBoard diagram={diagram} />).replace(/(<svg[^>]*>)/, `$1${font}`);
	writeFileSync(resolve(output, `${name}.svg`), `${markup}\n`);
}
