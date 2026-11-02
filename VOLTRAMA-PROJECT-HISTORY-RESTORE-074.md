# Voltrama Studio — Project History & Restore UI (074)

## Implementação

Implementada a interface privada de **Histórico de versões** sobre os contratos existentes:

- `GET /api/projects/{id}/revisions` para listar revisões.
- `GET /api/projects/{id}/revisions/{revisionNumber}` para carregar o snapshot autorizado.
- `POST /api/projects/{id}/revisions/{revisionNumber}/restore` para restaurar com `expectedRevision`.
- `PATCH /api/projects/{id}` para criar uma nova revisão a partir da edição visual de título/descrição.

Arquivos adicionados: `src/project-history.mjs`, `src/project-history.css`, `src/project-edit.mjs` e `tests/history-ui.mjs`. O Studio continua sendo uma única aplicação; não foi criado segundo sistema de versionamento.

## Funcionalidade e segurança

A interface lista identificador, data e hash da revisão; exibe uma comparação determinística de campos relevantes; escapa dados antes de inserir texto no DOM; e exige confirmação explícita antes da restauração. A restauração usa o endpoint do backend, mantém CSRF e ACL, cria nova revisão e preserva as anteriores. Conflitos e falhas de autorização recebem mensagens compreensíveis sem sucesso antecipado.

## Testes

- `npm ci`: aprovado anteriormente no mesmo worktree.
- `npm test`: aprovado, incluindo HTTP/ACL, restauração real do backend, persistência após reinicialização, build público, privacidade e `test:history-ui`.
- `npm run build:site`: aprovado; os módulos privados não entram no allowlist do build estático.
- `npm run test:site`: aprovado.
- `git diff --check`: aprovado.

## Navegador real

Em `127.0.0.1`, com banco descartável e conta demonstrativa, o fluxo visual comprovado foi: cadastro, login, criação do projeto, edição pela interface e criação da revisão 2; reabertura do Studio mostrou o projeto persistido e as revisões 1 e 2; a seleção da revisão 1 exibiu a comparação real, destacando a alteração do título e mantendo os demais campos sem alteração. O navegador apresentou instabilidade ao automatizar o diálogo nativo de confirmação de restauração; a restauração do endpoint e a preservação do histórico permanecem cobertas pelo teste HTTP existente. Portanto, o fluxo visual completo de confirmação/restauração não é declarado como totalmente comprovado.

## Classificação

**HISTORY_RESTORE_WITH_WARNINGS**

A funcionalidade está integrada e utilizável, com backend e persistência aprovados. Permanece pendente uma captura automatizada estável do diálogo nativo e da confirmação final no navegador real. A PR continua Draft; não houve merge, release, tag, Pages ou alteração de outros projetos.

## Git

Branch local: `integration/voltrama-studio-unified`  
Base verificada: `4b287a6`  
Commit final: `25ff1d1`  
PR: #23 Draft  
CI no HEAD final: `pull-request-validation` sucesso (run 41451003045) e `test` sucesso (run 41451003036).
