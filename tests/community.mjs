import assert from 'node:assert/strict';
import { createProject, validateProject, demoProjects } from '../src/project-model.mjs';
const fresh=createProject({id:'test-1',title:'Private test'});
assert.equal(fresh.visibility,'privado');
assert.equal(validateProject(fresh).valid,true);
assert.equal(validateProject({...fresh,developmentState:'invalid'}).valid,false);
assert.equal(demoProjects.every(p=>p.visibility==='publico'),true);
assert.equal(demoProjects.length,3);
console.log('community: ok — model defaults, validation and demo visibility pass');
