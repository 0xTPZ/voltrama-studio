# Estratégia segura de integração das PRs

As PRs são dependentes e permanecem Draft até revisão explícita:

1. **PR #1 / M0-001** — fundação visual e documentação inicial.
2. **PR #6** — proposta de privacidade, API e controle de agentes; documentação, não autenticação implementada.
3. **PR #7 / M0-002A** — Studio + Community e estabilização de navegação.
4. **PR #8 / M0-003 a M0-003B** — backend local autenticado, persistência, segurança e revisões imutáveis.

O próximo passo seguro é revisar o diff acumulado e o CI da PR #8, resolver eventuais divergências das PRs anteriores e somente então decidir merges explícitos em ordem. Nenhuma PR é mergeada automaticamente nesta missão; não há deploy nem publicação de projetos privados.
