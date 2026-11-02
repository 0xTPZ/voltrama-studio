# Voltrama Studio — History UI Fix & E2E Restore Validation (075)

## Correções

A falha reproduzida na Missão 074 era causada pelo listener global de clique adicionado ao módulo de histórico. Ao selecionar uma revisão, ele chamava `load()` novamente, zerava `state.selected` e reconstruía o painel. O listener global foi removido; a seleção agora é tratada somente pelo manipulador local criado quando o histórico do projeto é carregado.

O backend não foi reescrito. A UI continua usando os endpoints existentes, `expectedRevision`, CSRF, Origin e ACL. O `window.confirm()` permanece como confirmação explícita; ele não dispara restauração sem confirmação.

## Testes automatizados

- `npm test`: PASS.
- `npm run build:site`: PASS.
- `npm run test:site`: PASS.
- `git diff --check`: PASS.
- `tests/history-ui.mjs`: PASS, incluindo a regressão que impede o listener global de recarregar o histórico após a seleção.
- `tests/http.mjs`: PASS, cobrindo conflito, ACL, restauração válida, criação de nova revisão e preservação do histórico após reinício.

## Navegador real

Com banco descartável e conta `mission075@example.test`:

- cadastro e login: PASS;
- criação do projeto: PASS;
- carregamento do histórico: PASS;
- seleção da revisão 1 permanece selecionada e exibe comparação: PASS;
- diferença de campos foi exibida no snapshot real: PASS;
- confirmação nativa de restauração foi aberta: PASS.

O harness apresentou instabilidade ao fechar o diálogo nativo e ao coletar uma nova árvore imediatamente depois. Por isso, a confirmação foi comprovadamente aberta, mas o ciclo completo cancelar/confirmar e a captura de feedback persistente não são declarados como totalmente aprovados pelo navegador. A restauração e a preservação do histórico continuam comprovadas pelo teste HTTP real.

## Segurança e integridade

Dados são escapados antes da renderização; o conteúdo de snapshots não é executado. A restauração envia a revisão atual esperada e retorna conflito sem sobrescrever alterações recentes. Revisões anteriores permanecem imutáveis. Projetos privados não entram no build estático Community.

## GitHub

Branch local: `integration/voltrama-studio-unified`  
HEAD base: `25b2ff0`  
PR: #23 Draft, aberta, mergeable, sem merge  
Não houve alteração de licenças, release, tag, Pages ou outro projeto.

## Classificação

**HISTORY_UI_WITH_WARNINGS**

A causa da seleção instável foi corrigida e a comparação visual funciona. Permanece uma ressalva de instrumentação do diálogo nativo do navegador; não há evidência suficiente para classificar como `HISTORY_UI_READY`.
