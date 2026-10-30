import assert from 'node:assert/strict';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createApp } from '../server/app.mjs';

const dir=await mkdtemp(join(tmpdir(),'voltrama-m003-')); const dbPath=join(dir,'test.sqlite');
async function start(){const app=await createApp({databasePath:dbPath});await new Promise(resolve=>app.server.listen(0,resolve));return app;}
let app=await start(); let base=`http://127.0.0.1:${app.server.address().port}`;
function client(){const cookies=new Map();return {async request(path,options={}){const headers={...(options.headers||{})};if(cookies.size)headers.cookie=[...cookies].map(([k,v])=>`${k}=${v}`).join('; ');const r=await fetch(base+path,{...options,headers});for(const value of r.headers.getSetCookie?.()??[]){const [pair]=value.split(';');const [k,v]=pair.split('=');cookies.set(k,v)}return {status:r.status,body:await r.json().catch(()=>null)}},cookies};}
const a=client(), b=client();
async function csrf(c){const r=await c.request('/api/auth/csrf');return r.body.csrfToken;}
async function post(c,path,payload){return c.request(path,{method:'POST',headers:{'content-type':'application/json','x-csrf-token':await csrf(c)},body:JSON.stringify(payload)});}
async function patch(c,path,payload){return c.request(path,{method:'PATCH',headers:{'content-type':'application/json','x-csrf-token':await csrf(c)},body:JSON.stringify(payload)});}
assert.equal((await a.request('/')).status,200);assert.equal((await a.request('/favicon.svg')).status,200);assert.equal((await a.request('/../package.json')).status,404);
assert.equal((await a.request('/api/projects')).status,401);
assert.equal((await post(a,'/api/auth/register',{email:'a@example.com',password:'a-secure-password'})).status,200);
assert.equal((await post(b,'/api/auth/register',{email:'b@example.com',password:'b-secure-password'})).status,200);
const created=await post(a,'/api/projects',{title:'A private project',description:'Only account A',category:'outro',components:[{ref:'R1',name:'10k resistor'}],documentation:['design note'],diagrams:['schematic.svg'],photographs:['bench.jpg'],testEvidence:['manual check'],versions:[{id:'v1',label:'initial snapshot'}]});assert.equal(created.status,201);const projectId=created.body.project.id;
let roundTrip=(await a.request(`/api/projects/${projectId}`)).body.project;assert.deepEqual(roundTrip.components,[{ref:'R1',name:'10k resistor'}]);assert.deepEqual(roundTrip.documentation,['design note']);assert.deepEqual(roundTrip.diagrams,['schematic.svg']);assert.deepEqual(roundTrip.photographs,['bench.jpg']);assert.deepEqual(roundTrip.testEvidence,['manual check']);assert.deepEqual(roundTrip.versions,[{id:'v1',label:'initial snapshot'}]);
assert.equal((await b.request(`/api/projects/${projectId}`)).status,404);assert.equal((await b.request('/api/projects')).body.projects.length,0);
assert.equal((await b.request(`/api/projects/${projectId}`,{method:'PATCH',headers:{'content-type':'application/json','x-csrf-token':await csrf(b)},body:JSON.stringify({title:'stolen'})})).status,404);
assert.equal((await a.request(`/api/projects/${projectId}`,{method:'PATCH',headers:{'content-type':'application/json'},body:'{}'})).status,403);
const edited=await patch(a,`/api/projects/${projectId}`,{title:'A edited',description:'updated',category:'instrumentacao',components:roundTrip.components,documentation:roundTrip.documentation,diagrams:roundTrip.diagrams,photographs:roundTrip.photographs,testEvidence:roundTrip.testEvidence,versions:[{id:'v2',label:'edited snapshot'}],developmentState:'em-desenvolvimento'});assert.equal(edited.status,200);
roundTrip=(await a.request(`/api/projects/${projectId}`)).body.project;assert.equal(roundTrip.title,'A edited');assert.deepEqual(roundTrip.versions,[{id:'v2',label:'edited snapshot'}]);
assert.equal((await a.request('/api/projects',{method:'POST',headers:{'content-type':'application/json','x-csrf-token':await csrf(a)},body:'x'.repeat(100001)})).status,413);
assert.equal((await post(a,'/api/auth/logout',{})).status,200);assert.equal((await a.request(`/api/projects/${projectId}`)).status,401);
assert.equal((await post(a,'/api/auth/login',{email:'a@example.com',password:'a-secure-password'})).status,200);assert.equal((await a.request(`/api/projects/${projectId}`)).body.project.title,'A edited');
await new Promise(resolve=>app.server.close(resolve));app.db.close();app=await start();base=`http://127.0.0.1:${app.server.address().port}`;const c=client();assert.equal((await post(c,'/api/auth/login',{email:'a@example.com',password:'a-secure-password'})).status,200);assert.equal((await c.request('/api/projects')).body.projects[0].title,'A edited');
await new Promise(resolve=>app.server.close(resolve));app.db.close();await rm(dir,{recursive:true,force:true});console.log('http: ok — static isolation, auth, ACL, logout and restart persistence pass');
