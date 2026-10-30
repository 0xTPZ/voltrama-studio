import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { createApp } from '../server/app.mjs';
const dir=await mkdtemp(join(tmpdir(),'voltrama-migration-')),dbPath=join(dir,'legacy.sqlite'),legacy=new DatabaseSync(dbPath);legacy.exec(await readFile(new URL('../server/migrations/001-initial.sql',import.meta.url),'utf8'));legacy.prepare('INSERT INTO users VALUES (?,?,?,?)').run('u1','legacy@example.com','not-used',new Date().toISOString());legacy.prepare('INSERT INTO projects (id,owner_id,title,description,category,development_state,visibility,components_json,documentation_json,versions_json,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)').run('p1','u1','Legacy','kept','outro','conceito','privado','[]','[]','[]',new Date().toISOString(),new Date().toISOString());legacy.close();
let app=await createApp({databasePath:dbPath});assert.equal(app.db.prepare('SELECT COUNT(*) AS n FROM schema_migrations').get().n,7);assert.equal(app.db.prepare('SELECT title FROM projects WHERE id=?').get('p1').title,'Legacy');app.db.close();app=await createApp({databasePath:dbPath});assert.equal(app.db.prepare('SELECT COUNT(*) AS n FROM schema_migrations').get().n,7);assert.equal(app.db.prepare('SELECT description FROM projects WHERE id=?').get('p1').description,'kept');app.db.close();await rm(dir,{recursive:true,force:true});console.log('migrations: ok — legacy data preserved and migrations are idempotent');
