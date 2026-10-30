# Contrato público de documentação

O Community consome snapshots públicos versionados (`schemaVersion: 1.0`), não o armazenamento privado do Studio. Um snapshot pode conter identificação, descrição, objetivos, componentes, documentação, diagramas, fotografias, medições, evidências, estado de desenvolvimento, revisões persistidas, autoria, colaboradores, licença e avisos.

O projeto interno e o snapshot são objetos distintos. A visibilidade privada permanece inalterada; a prévia apenas calcula a seleção autorizada e informa `publicationPerformed: false`. Não existe publicação automática nesta missão.

Arquivos precisam ser autorizados individualmente. Evidência ausente não pode ser exibida como teste validado, e os exemplos atuais são fictícios. O build público é uma allowlist estática e não lê o banco ou a pasta `data/`.
