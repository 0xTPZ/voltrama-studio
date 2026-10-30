# Contrato público de documentação

O Community consome snapshots públicos versionados (`schemaVersion: 1.1`), não o armazenamento privado do Studio. Um snapshot pode conter identificação, descrição, objetivos, componentes, documentação, diagramas, fotografias, medições, evidências, estado de desenvolvimento, revisões persistidas, autoria, colaboradores, licença e avisos.

O projeto interno e o snapshot são objetos distintos. A autorização é fail-closed: manifesto, proprietário, confirmação auditável, campos não vazios e inventário conhecido são obrigatórios. A prévia apenas calcula a seleção e informa `publicationPerformed: false`; ela não está conectada a contas privadas. Não existe publicação automática nesta missão.

Arquivos precisam ser autorizados individualmente por identificador do inventário; caminhos arbitrários são rejeitados. Evidência precisa ser estruturada e possuir proveniência para estados físicos/revisados. O validador de manifesto não substitui autenticação, autorização e confirmação auditável no backend. Os exemplos atuais são fictícios. O build público copia apenas arquivos allowlisted e não lê o armazenamento privado ou a pasta `data/`.
