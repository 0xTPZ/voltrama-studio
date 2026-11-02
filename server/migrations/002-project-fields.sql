ALTER TABLE projects ADD COLUMN diagrams_json TEXT NOT NULL DEFAULT '[]';
ALTER TABLE projects ADD COLUMN photographs_json TEXT NOT NULL DEFAULT '[]';
ALTER TABLE projects ADD COLUMN test_evidence_json TEXT NOT NULL DEFAULT '[]';
