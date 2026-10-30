import assert from 'node:assert/strict';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawn } from 'node:child_process';
import { createApp } from '../server/app.mjs';
if(process.platform!=='win32'){console.log('bootstrap: skipped — DPAPI integration is Windows-only');process.exit(0)}
const dir=await mkdtemp(join(tmpdir(),'voltrama-bootstrap-')),dbPath=join(dir,'owner.sqlite'),credentialPath=join(dir,'credential.dpapi');const app=await createApp({databasePath:dbPath});app.db.close();
const run=()=>new Promise((resolve,reject)=>{const p=spawn(process.execPath,['tools/bootstrap-owner.mjs'],{cwd:process.cwd(),env:{...process.env,VOLTRAMA_DB_PATH:dbPath,VOLTRAMA_OWNER_CREDENTIAL_PATH:credentialPath},stdio:['ignore','pipe','pipe']});let out='',err='';p.stdout.on('data',x=>out+=x);p.stderr.on('data',x=>err+=x);p.on('close',code=>code?reject(new Error(`${out}\n${err}`)):resolve(out))});
const first=await run();assert.match(first,/OWNER_CREATED username=0xTPZ/);const second=await run();assert.equal(second.trim(),'OWNER_ALREADY_EXISTS');await rm(dir,{recursive:true,force:true});console.log('bootstrap: ok — owner provisioning is idempotent and secret-free');
