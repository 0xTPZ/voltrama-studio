import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { randomBytes, randomUUID, createHash } from 'node:crypto';
import { spawn } from 'node:child_process';
import argon2 from 'argon2';
import { createApp } from '../server/app.mjs';

const dbPath=process.env.VOLTRAMA_DB_PATH||join(process.cwd(),'data','voltrama.sqlite');
const backupDir=join(process.cwd(),'..','workspace','backups');
const credentialPath=process.env.VOLTRAMA_OWNER_CREDENTIAL_PATH||join(process.env.LOCALAPPDATA||join(process.cwd(),'..','workspace'),'VoltramaStudio','owner-credential.dpapi');
if(!existsSync(dbPath)) throw new Error('database does not exist');
await mkdir(backupDir,{recursive:true});const backup=join(backupDir,`voltrama-bootstrap-${Date.now()}.sqlite`);await copyFile(dbPath,backup);
const app=await createApp({databasePath:dbPath});const db=app.db;const existing=db.prepare("SELECT id,username FROM users WHERE username='0xTPZ' OR username IS NOT NULL LIMIT 1").get();if(existing){db.close();console.log('OWNER_ALREADY_EXISTS');process.exit(0)}
if(existsSync(credentialPath))throw new Error('credential_store_exists');
const password=randomBytes(32).toString('base64url');const powershell=process.env.VOLTRAMA_POWERSHELL||'pwsh.exe';const encrypted=await new Promise((resolve,reject)=>{const ps=spawn(powershell,['-NoProfile','-NonInteractive','-Command',"$s=[Console]::In.ReadToEnd();$sec=ConvertTo-SecureString $s -AsPlainText -Force;ConvertFrom-SecureString $sec"],{stdio:['pipe','pipe','pipe']});let out='',err='';ps.stdout.on('data',x=>out+=x);ps.stderr.on('data',x=>err+=x);ps.on('close',c=>c?reject(new Error(err||'DPAPI failed')):resolve(out.trim()));ps.stdin.end(password)});if(!encrypted)throw new Error('empty_credential_store');await mkdir(join(credentialPath,'..'),{recursive:true});await writeFile(credentialPath,encrypted,{encoding:'utf8',mode:0o600});
const hash=await argon2.hash(password,{type:argon2.argon2id});const id=randomUUID(),stamp=new Date().toISOString();db.exec('BEGIN');try{db.prepare('INSERT INTO users (id,email,password_hash,created_at,username,must_change_password) VALUES (?,?,?,?,?,?)').run(id,'',hash,stamp,'0xTPZ',1);db.prepare('INSERT INTO user_profiles (user_id,display_name,github_username,avatar_url,bio,updated_at) VALUES (?,?,?,?,?,?)').run(id,'Lyncon | Topazio Labs','0xTPZ','https://avatars.githubusercontent.com/u/328812100?v=4','',stamp);db.prepare('INSERT INTO audit_events VALUES (?,?,?,?,?)').run(randomUUID(),id,'owner.bootstrap',id,stamp);db.exec('COMMIT')}catch(e){db.exec('ROLLBACK');throw e}db.close();password.replace(/./g,'0');console.log(`OWNER_CREATED username=0xTPZ credential_store=${credentialPath} backup=${backup}`);
