import { readFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
const html = await readFile(new URL('../src/index.html', import.meta.url), 'utf8');
const css = await readFile(new URL('../src/styles.css', import.meta.url), 'utf8');
const js = await readFile(new URL('../src/app.js', import.meta.url), 'utf8');
const readme = await readFile(new URL('../README.md', import.meta.url), 'utf8');
assert.match(html, /lang="pt-BR"/); assert.match(html, /viewport/); assert.match(html, /favicon\.svg/); assert.match(html, /type="module"/);
assert.match(css, /@media\(max-width:760px\)/); assert.match(js, /hashchange/); assert.match(readme, /MIT/);
console.log('smoke: ok — interface assets and navigation contracts present');
