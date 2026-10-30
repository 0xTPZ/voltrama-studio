import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
const files=await readdir(new URL('../dist/',import.meta.url));assert.deepEqual(new Set(files),new Set(['404.html','app.mjs','public-project.mjs','components.mjs','favicon.svg','index.html','styles.css','.nojekyll']));
for(const file of files){const text=await readFile(new URL(`../dist/${file}`,import.meta.url),'utf8');assert.doesNotMatch(text,/server\/|voltrama\.sqlite|HttpOnly|voltrama_session|argon2|password_hash|BEGIN PRIVATE KEY/i)}
const html=await readFile(new URL('../dist/index.html',import.meta.url),'utf8');assert.match(html,/lang="pt-BR"/);assert.match(html,/viewport/);assert.match(html,/favicon\.svg/);assert.match(html,/type="module"/);console.log('public-site: ok — static allowlist and privacy scan pass');
