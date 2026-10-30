ALTER TABLE projects ADD COLUMN current_revision INTEGER NOT NULL DEFAULT 0;
ALTER TABLE project_versions ADD COLUMN revision_number INTEGER;
ALTER TABLE project_versions ADD COLUMN snapshot_hash TEXT;
CREATE UNIQUE INDEX IF NOT EXISTS project_revision_number_idx ON project_versions(project_id, revision_number);
