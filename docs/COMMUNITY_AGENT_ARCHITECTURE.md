# Voltrama Studio + Community: privacidade, identidade e controle por agentes

**Status:** proposta de arquitetura, não implementada. **Issue e PR de planejamento:** não alterar a fundação M0-001 sem revisão.

## Visão

- **Voltrama Studio:** criação/edição, esquemas, inventário, revisões, simulação quando validada.
- **Voltrama Community:** catálogo público, páginas de projetos, colaboração e documentação.
- **Voltrama API:** identidade compartilhada, projeto, permissões, versões, anexos e publicação.
- **Agentes:** ações tipadas via API/MCP, usadas por Codex ou ChatGPT dentro dos limites da conta autorizada.
- **Contexto operacional dos agentes:** repositório privado `0xTPZ/voltrama-internal`. Não misturar com projetos dos usuários nem com o código público.

## Proteção de projetos

- Todo projeto começa com `visibility=private` **no servidor e no banco**, independentemente da UI.
- Papéis iniciais: `owner`, `editor`, `viewer`; aplicar ACL em projeto, anexos, versão, exportação, simulação e resultados.
- A publicação exige ação confirmada, e publica **snapshot explícito** de uma versão escolhida, não todo o workspace privado.
- Estados: `private`, `shared` (convite autenticado), `public` (snapshot publicado). Um eventual `unlisted` **não** conta como privado.
- Projetos privados: nunca em Git público, catálogo, índices de busca, sitemap, previews, feeds, cache/CDN público ou resultados agregados identificáveis.
- Mudança de visibilidade é auditável e revogável quanto ao **acesso futuro**. Material já copiado por terceiros não pode ser recuperado garantidamente.

## Identidade e autenticação

- Cadastro/login com provedor OIDC/OAuth ou serviço próprio submetido a revisão de segurança.
- Web: cookies `HttpOnly`, `Secure`, `SameSite` com proteção CSRF; sessão e autorização validadas no servidor.
- Agentes: tokens com escopos específicos, expiração curta, revogação e autorização por usuário/projeto. Nada de tokens, cookies ou segredos em prompts, repositórios ou logs.
- Rate limiting, validação dos arquivos, uploads privados, antifraude/spam e requisitos de LGPD antes do lançamento.

## Ações que Codex e ChatGPT poderão executar

A proposta de comandos MCP/API inclui:

| Ferramenta | Regras |
| --- | --- |
| `list_my_projects` | Retorna apenas recursos autorizados |
| `create_private_project` | Sempre cria como privado |
| `update_project_draft` | Edição com controle de versão/conflitos |
| `attach_evidence` | Verifica tipo, limites, origem e permissões |
| `export_project` | Download autorizado e auditado |
| `run_simulation` | Worker isolado, limites de tempo/recursos, relatório reproduzível |
| `propose_publication` | Preview de versão, título, arquivos e visibilidade |
| `confirm_publication` | Exige confirmação explícita e identificador da versão |
| `invite_collaborator` | Confirmação explícita do autor |
| `revoke_access` | Gera auditoria e invalida acessos futuros |

**O modelo não é administrador da plataforma.** Chamadas devem respeitar os mesmos privilégios que o usuário possui no site. Instruções encontradas em esquemas importados, anexos ou comentários não autorizam ações de agentes.

## API e modelo mínimo

Entidades sugeridas: `users`, `projects`, `project_memberships`, `revisions`, `files`, `publications`, `publication_assets`, `audit_events`, `agent_grants`.

Exemplos:
- `POST /api/v1/projects` -> sempre `private`.
- `GET /api/v1/projects/{id}` -> sessão + autorização objeto a objeto.
- `POST /api/v1/projects/{id}/revisions` -> nova versão privada.
- `POST /api/v1/projects/{id}/publication-proposals` -> prévia sem efeito público.
- `POST /api/v1/projects/{id}/publications` -> confirmação explícita.
- `GET /api/v1/publications/{slug}` -> apenas snapshot público.

## MVP e critérios de aceite

1. Catalogação pública estática e documentação demonstrativa claramente rotulada.
2. Modelo unificado de projetos, versões e visibilidade.
3. Backend de sessão e ACL com testes de isolamento entre contas.
4. Biblioteca privada e fluxo de publicação explícito.
5. Instrumentação MCP/API com permissões, confirmações e auditoria.
6. Colaboração e comentários moderados.
7. Simulação isolada com proveniência e limites; resultado de simulação não implica validação física.

**Testes obrigatórios:** usuário A não acessa projeto privado de B por ID nem URL; miniaturas privadas não vazam; agentes não conseguem elevar escopo; publicação sem confirmação falha; revogação invalida novos acessos; logs não expõem segredos.

## Implementação

A primeira UI Community foi preparada como prévia HTML/CSS/JS estática e **não implementa autenticação, persistência nem simulação**. Integrar a interface somente depois de revisão do layout existente no Studio. O front-end público pode usar hospedagem estática; a API de projetos privados exigirá backend e storage autenticados. Arquivos de projetos de usuários não devem ser armazenados diretamente no repositório público da aplicação.

**Workspace local planejado:** `E:\Voltrama\voltrama-studio`. Preservar a PR M0-001 e trabalhar em branch independente.
