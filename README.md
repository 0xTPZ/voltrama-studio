# Voltrama Studio + Community

Voltrama Studio + Community é uma fundação open source para engenharia eletrônica: o Studio organiza projetos e a Community apresenta snapshots públicos documentados.

> M0-002 entrega uma experiência Community demonstrativa. Editor elétrico, autenticação, persistência, publicação real, simulação e validação elétrica ainda não estão implementados.

## Estado atual

- Interface estática responsiva em HTML, CSS e JavaScript sem dependências externas.
- Catálogo demonstrativo com busca, filtros, detalhes, documentação, componentes e evidências.
- O Community usa snapshots públicos versionados e allowlisted; a prévia de publicação é informativa e não altera projetos privados.
- Identidade visual original baseada em trilhas de circuito e nós de conexão.

## Executar localmente

Como o front-end usa ES modules, execute por HTTP local:

```text
npm run dev
```

Abra `http://localhost:4173`. Para os testes automatizados, execute `npm test`.

## Documentação

- [Arquitetura](docs/ARCHITECTURE.md)
- [Community](docs/COMMUNITY.md)
- [Contratos de API](docs/API_CONTRACTS.md)
- [Integrações](docs/INTEGRATIONS.md)
- [Contrato de documentação pública](docs/PUBLIC_DOCUMENTATION_CONTRACT.md)

## Princípios

Clareza antes de automação, interoperabilidade antes de lock-in, rastreabilidade antes de confiança implícita e acessibilidade desde o primeiro componente. Projetos privados devem ser protegidos no servidor, nunca apenas pela UI.

## Licença

MIT. Consulte [LICENSE](LICENSE).
