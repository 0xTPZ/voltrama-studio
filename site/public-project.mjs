export const PUBLIC_SCHEMA_VERSION = '1.0';

const clone = value => JSON.parse(JSON.stringify(value));

export function createPublicSnapshot(input, authorization = {}) {
  const allowedFields = new Set(authorization.fields || []);
  const allowedFiles = new Set(authorization.files || []);
  const source = clone(input);
  const snapshot = {
    schemaVersion: PUBLIC_SCHEMA_VERSION,
    id: source.id,
    title: source.title,
    description: source.description,
    objective: source.objective,
    objectives: source.objectives || [source.objective].filter(Boolean),
    category: source.category,
    developmentState: source.state,
    components: source.components || [],
    documentation: source.docs || [],
    diagrams: (source.media || []).filter(file => allowedFiles.has(file)),
    photographs: [],
    measurements: source.measurements || [],
    evidence: source.evidence || source.tests || [],
    revisionHistory: source.revisionHistory || [{ label: source.version, persisted: true }],
    author: source.author,
    collaborators: source.collaborators || [],
    license: source.license,
    notices: source.notices || ['Demonstração pública; não representa validação elétrica.'],
    files: [...allowedFiles],
    publication: { kind: 'public-snapshot', sourceRevision: source.version || null, explicitAuthorization: true }
  };
  for (const key of Object.keys(snapshot)) {
    if (!['schemaVersion','id','publication'].includes(key) && allowedFields.size && !allowedFields.has(key)) delete snapshot[key];
  }
  return snapshot;
}

export function validatePublicSnapshot(snapshot) {
  const required = ['schemaVersion','id','title','description','developmentState','author','license','publication'];
  const missing = required.filter(key => !snapshot?.[key]);
  if (missing.length) throw new Error(`snapshot missing: ${missing.join(', ')}`);
  if (snapshot.publication.kind !== 'public-snapshot' || snapshot.publication.explicitAuthorization !== true) throw new Error('snapshot authorization is invalid');
  if (snapshot.developmentState === 'testado' && !(snapshot.evidence || []).length) throw new Error('validated state requires evidence');
  return true;
}

export function buildPublicationPreview(project, authorization = {}) {
  const snapshot = createPublicSnapshot(project, authorization);
  validatePublicSnapshot(snapshot);
  const fields = Object.keys(snapshot).filter(key => key !== 'publication').map(name => ({ name, included: Object.hasOwn(snapshot, name) }));
  const files = [...new Set(authorization.files || [])].map(name => ({ name, included: true }));
  return { schemaVersion: PUBLIC_SCHEMA_VERSION, fields, files, visibilityUnchanged: true, publicationPerformed: false, snapshot };
}
