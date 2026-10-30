# Revisões e snapshots

M0-003B trata revisão de engenharia como histórico imutável, separado de rótulos de documentação.

- Cada projeto começa com a revisão `1` criada pelo servidor.
- O servidor atribui `revisionId` global (UUID) e `revisionNumber` sequencial por projeto.
- `PATCH` exige `expectedRevision`; uma revisão obsoleta retorna `409 revision_conflict`.
- Cada revisão guarda um snapshot completo e seu hash SHA-256.
- Atualizações inserem uma nova revisão; nunca apagam revisões anteriores.
- Restaurar a revisão `n` cria uma nova revisão com o conteúdo daquela revisão.
- `versions` é metadado gerado pelo servidor, não uma lista confiada ao navegador.

Endpoints autenticados:

- `GET /api/projects/{id}/revisions`
- `GET /api/projects/{id}/revisions/{revisionNumber}`
- `POST /api/projects/{id}/revisions/{revisionNumber}/restore` com `expectedRevision`

Não há publicação pública nesta etapa. Histórico persistido não equivale a certificação elétrica.
