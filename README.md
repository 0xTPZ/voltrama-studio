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
