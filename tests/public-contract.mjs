import assert from 'node:assert/strict';
import { buildPublicationPreview, createPublicSnapshot, validatePublicSnapshot } from '../site/public-project.mjs';
const project={id:'private-demo',title:'Private',description:'x',objective:'y',state:'simulado',author:'A',license:'MIT',version:'v1',tests:[]};
const preview=buildPublicationPreview(project,{fields:['id','title','description','objective','developmentState','author','license','evidence'],files:['diagram.svg']});
assert.equal(preview.visibilityUnchanged,true); assert.equal(preview.publicationPerformed,false); assert.deepEqual(preview.files,[{name:'diagram.svg',included:true}]);
assert.equal(preview.snapshot.id,'private-demo'); assert.equal(Object.hasOwn(preview.snapshot,'session'),false); validatePublicSnapshot(preview.snapshot);
assert.throws(()=>validatePublicSnapshot({...preview.snapshot,developmentState:'testado',evidence:[]}));
assert.equal(createPublicSnapshot({...project,secret:'do-not-export'},{fields:['id','title']}).secret,undefined);
console.log('public-contract: ok — explicit authorization, safe preview and evidence rule pass');
