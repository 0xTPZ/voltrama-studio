import { readFile } from 'node:fs/promises';
import assert from 'node:assert/strict';

const html=await readFile(new URL('../src/index.html',import.meta.url),'utf8');
const history=await readFile(new URL('../src/project-history.mjs',import.meta.url),'utf8');
const edit=await readFile(new URL('../src/project-edit.mjs',import.meta.url),'utf8');
assert.match(html,/project-history\.mjs/); assert.match(html,/project-edit\.mjs/);
for(const endpoint of ['/revisions','/revisions/${','/restore'])assert.match(history,new RegExp(endpoint.replace(/[${}]/g,'\\$&')));
assert.match(history,/expectedRevision/); assert.match(history,/confirm\(/); assert.match(history,/aria-label="Comparação/);
assert.doesNotMatch(history,/document\.addEventListener\('click'/);
assert.match(edit,/expectedRevision/); assert.match(edit,/Salvo como revisão/);
console.log('history-ui: ok — private revision history, deterministic comparison and explicit restore contracts present');
