# Voltrama Studio + Community

Voltrama Studio + Community é uma fundação open source para engenharia eletrônica: o Studio organiza projetos e a Community apresenta snapshots públicos documentados.

> M0-003B entrega cadastro, autenticação local, projetos privados persistentes e histórico imutável de snapshots. Publicação, simulação e validação elétrica ainda não estão implementadas.

## Estado atual

- Interface responsiva em HTML, CSS e JavaScript, servida pelo backend local.
- Catálogo demonstrativo com busca, filtros, detalhes, documentação, componentes e evidências.
- Studio e Community consomem o mesmo contrato de projeto; autenticação, persistência e revisões são implementadas no backend local.
- Identidade visual original baseada em trilhas de circuito e nós de conexão.

## Executar localmente

Como o front-end usa ES modules e a bancada privada usa a API local, execute por HTTP:

```text
npm run dev
```

Abra `http://127.0.0.1:4173`. O servidor de desenvolvimento escuta somente no loopback e não deve ser exposto à rede. Crie uma conta de demonstração com senha de pelo menos 12 caracteres para testar a bancada privada. Para os testes automatizados, execute `npm test`.

Para provisionar a conta inicial do proprietário em uma instalação local já existente, pare o servidor e execute `npm run bootstrap:owner`. O comando cria um backup antes da migração, é idempotente e grava a senha inicial apenas como hash Argon2id no banco e como segredo protegido por DPAPI no perfil local do Windows. A senha nunca aparece na saída do comando; o proprietário deve recuperá-la pelo mecanismo local protegido e trocá-la imediatamente pelo endpoint autenticado de alteração de senha. O bootstrap não é um endpoint HTTP e não deve ser executado contra banco de produção.

No Windows, o proprietário pode executar `powershell -ExecutionPolicy Bypass -File tools/recover-owner-credential.ps1` localmente. O assistente copia a credencial para a área de transferência, sem imprimi-la. Cole-a apenas no campo de senha temporária da tela de primeiro acesso e depois limpe a área de transferência.

## Documentação

- [Arquitetura](docs/ARCHITECTURE.md)
- [Community](docs/COMMUNITY.md)
- [Contratos de API](docs/API_CONTRACTS.md)
- [ADR do backend](docs/ADR-003-backend.md)
- [Revisões e snapshots](docs/VERSIONS.md)
- [Integrações](docs/INTEGRATIONS.md)

## Princípios

Clareza antes de automação, interoperabilidade antes de lock-in, rastreabilidade antes de confiança implícita e acessibilidade desde o primeiro componente. Projetos privados devem ser protegidos no servidor, nunca apenas pela UI. Persistência de projetos e snapshots é implementada no MVP local; o servidor, sessões e cookies ainda requerem TLS, store de sessão adequado e revisão de segurança antes de produção.

## Licença

MIT. Consulte [LICENSE](LICENSE).
