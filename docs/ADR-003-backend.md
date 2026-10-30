# ADR-003 — Backend inicial para projetos privados

## Status

Aceita para M0-003, com revisão de segurança posterior obrigatória.

## Decisão

Usar Node.js 24, HTTP nativo, SQLite embutido (`node:sqlite`) e Argon2id (`argon2`) na primeira fatia funcional.

## Motivos

- Executa localmente no Windows com um único comando e sem serviço externo obrigatório.
- SQLite fornece migrações reproduzíveis e persistência real para o MVP, sem misturar banco no Git.
- Argon2id atende ao armazenamento moderno de senhas sem implementar criptografia própria.
- HTTP nativo mantém a superfície pequena e deixa contratos API/MCP explícitos para futura extração de serviço.
- A separação entre `server/`, `src/` e `server/migrations/` permite trocar o transporte ou o banco sem reescrever o modelo visual.

## Alternativas consideradas

- PHP/MySQL: compatível com hospedagem tradicional, mas adicionaria runtime e serviço externo ao desenvolvimento local imediato.
- PostgreSQL: melhor para escala e concorrência, mas desnecessário para a primeira fatia local; pode substituir SQLite atrás dos mesmos repositórios.
- Framework web: útil quando o painel crescer, mas não necessário antes de consolidar contratos e testes de autorização.

## Limites

Sessões estão em memória nesta etapa e expiram em 24h; reiniciar o servidor exige novo login, mas os projetos permanecem no SQLite. Cookies locais não usam `Secure` fora de produção. Ainda faltam rate limiting distribuído, recuperação de conta, rotação de sessão, gestão de convites e revisão de segurança/privacidade para produção.
