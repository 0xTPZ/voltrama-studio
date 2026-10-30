# Voltrama Studio + Community

Voltrama Studio + Community é uma fundação open source para engenharia eletrônica: o Studio organiza projetos e a Community apresenta snapshots públicos documentados.

> M0-002 entrega uma experiência Community demonstrativa. Editor elétrico, autenticação, persistência, publicação real, simulação e validação elétrica ainda não estão implementados.

## Estado atual

- Interface estática responsiva em HTML, CSS e JavaScript sem dependências externas.
- Catálogo demonstrativo com busca, filtros, detalhes, documentação, componentes e evidências.
- Studio e Community consomem o mesmo contrato de projeto; autenticação e persistência ficam para um backend futuro.
- Identidade visual original baseada em trilhas de circuito e nós de conexão.

## Executar localmente

Como o front-end usa ES modules e a bancada privada usa a API local, execute por HTTP:

```text
npm run dev
```

Abra `http://localhost:4173`. Crie uma conta de demonstração com senha de pelo menos 12 caracteres para testar a bancada privada. Para os testes automatizados, execute `npm test`.

## Documentação

- [Arquitetura](docs/ARCHITECTURE.md)
- [Community](docs/COMMUNITY.md)
- [Contratos de API](docs/API_CONTRACTS.md)
- [ADR do backend](docs/ADR-003-backend.md)
- [Integrações](docs/INTEGRATIONS.md)

## Princípios

Clareza antes de automação, interoperabilidade antes de lock-in, rastreabilidade antes de confiança implícita e acessibilidade desde o primeiro componente. Projetos privados devem ser protegidos no servidor, nunca apenas pela UI. Esta implementação é um MVP local e ainda requer revisão de segurança antes de produção.

## Licença

MIT. Consulte [LICENSE](LICENSE).
