# Contratos de API — proposta e fatia M0-003

Os endpoints abaixo agora têm uma implementação local mínima. Eles não constituem uma API pronta para produção.

| Método | Endpoint | Regra |
| --- | --- | --- |
| GET | `/api/auth/csrf` | Emite token CSRF para a sessão local. |
| POST | `/api/auth/register` | Cria conta com senha Argon2id; requer CSRF. |
| POST | `/api/auth/login` | Cria sessão HttpOnly; requer CSRF e limite básico de tentativas. |
| POST | `/api/auth/logout` | Invalida a sessão; requer CSRF. |
| GET | `/api/auth/me` | Retorna somente a identidade da sessão atual. |
| GET | `/api/projects` | Lista projetos do proprietário autenticado. |
| POST | `/api/projects` | Cria projeto privado; proprietário vem da sessão. |
| GET/PATCH | `/api/projects/{id}` | Consulta ou cria nova revisão somente com `expectedRevision` atual. |
| GET | `/api/projects/{id}/revisions` | Lista revisões imutáveis do proprietário. |
| GET | `/api/projects/{id}/revisions/{revisionNumber}` | Consulta snapshot específico autorizado. |
| POST | `/api/projects/{id}/revisions/{revisionNumber}/restore` | Cria nova revisão a partir de snapshot anterior. |

Falhas de autorização retornam `404 project_not_found` para não confirmar a existência de recursos de outro usuário. O backend persiste componentes, documentação, diagramas, fotografias, evidências e snapshots de versão. Publicação, compartilhamento, exclusão e MCP continuam fora do escopo.
