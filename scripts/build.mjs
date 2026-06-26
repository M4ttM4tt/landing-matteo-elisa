// Build = copy the static source verbatim into dist/.
// The site is intentionally zero-transform: the page is a self-contained
// prerender driven by a proprietary runtime, so we never re-bundle it.
// dist/ exists only so hosts that expect a build output (and `npm run preview`)
// have a stable folder to serve.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const src = path.join(root, 'src');
const dist = path.join(root, 'dist');

fs.rmSync(dist, { recursive: true, force: true });
fs.cpSync(src, dist, { recursive: true });

const count = fs.readdirSync(dist, { recursive: true }).length;
console.log(`Copied ${count} entries -> dist/`);
