import { cp, lstat, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
const project=fileURLToPath(new URL('../',import.meta.url)),source=join(project,'site'),dist=join(project,'dist');
await rm(dist,{recursive:true,force:true});await mkdir(dist,{recursive:true});
const forbidden=['server/','data/','node_modules/','.env','context.md','voltrama-internal','voltrama_session','password_hash','argon2','begin private key','sqlite'];
const files=['index.html','app.mjs','public-project.mjs','styles.css','favicon.svg'];
for(const file of files){const stat=await lstat(join(source,file));if(!stat.isFile()||stat.isSymbolicLink())throw new Error(`public asset is not a regular file: ${file}`);await cp(join(source,file),join(dist,file));}
for(const file of files){const text=(await readFile(join(dist,file),'utf8')).toLowerCase();for(const term of forbidden){if(text.includes(term))throw new Error(`forbidden term in static asset: ${term}`)}}
const index=await readFile(join(dist,'index.html'),'utf8');await writeFile(join(dist,'404.html'),index);await writeFile(join(dist,'.nojekyll'),'');console.log(`public site built: ${files.length+2} files in ${resolve(dist)}`);
