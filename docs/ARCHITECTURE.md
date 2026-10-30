# Arquitetura Studio + Community

O Studio e a Community usam o contrato compartilhado em `src/project-model.mjs`. A prévia atual usa dados públicos fictícios em memória apenas para demonstrar a experiência. Ela não implementa login, ACL, persistência, publicação ou simulação.

Um projeto possui identidade, autor, categoria, componentes, documentação, diagramas, fotografias, evidências de testes, versões, estado de desenvolvimento e visibilidade. A visibilidade padrão é `privado`; os dados de demonstração são explicitamente `publico`.

Estados de desenvolvimento descrevem maturidade do artefato e não equivalem a certificação de segurança. Autenticação, autorização por projeto, armazenamento e publicação devem ser implementados no backend.
