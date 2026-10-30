# Instruções públicas do Voltrama Studio

## Escopo

Preserve a arquitetura modular e não declare simulação, validação elétrica ou integrações como concluídas sem testes e evidências reproduzíveis.

## Desenvolvimento

- Mantenha a interface acessível: HTML semântico, foco visível, contraste adequado e navegação por teclado.
- Prefira módulos pequenos e contratos explícitos.
- Não adicionar credenciais, contexto operacional privado ou dados pessoais ao repositório público.
- Documentar decisões técnicas em `docs/DECISIONS.md`.

## Verificação

Para a fundação atual, execute `node tests/smoke.mjs`. Futuras camadas devem adicionar testes de importação/exportação e simulação antes de oferecer resultados ao usuário.
