# Voltrama Community — site público

M0-004 cria uma vitrine estática independente do backend privado. O conteúdo é fictício, público e rotulado como demonstração.

## Build local

```text
npm run build:site
npm run test:site
```

O build permitido contém somente `dist/index.html`, `dist/app.mjs`, `dist/styles.css`, `dist/favicon.svg`, `dist/404.html` e `.nojekyll`. O scanner falha se encontrar backend, SQLite, sessões, cookies privados, tokens ou contextos operacionais.

## GitHub Pages

O workflow `.github/workflows/pages.yml` constrói e publica somente a branch `m0-004/community-showcase`. Se Pages ainda não estiver habilitado no repositório, um administrador deve abrir Settings → Pages, escolher GitHub Actions como source e reexecutar o workflow. Nenhuma API Node é implantada; a URL esperada é `https://0xTPZ.github.io/voltrama-studio/` após a configuração do Pages.

## Limites

O site não possui login, cookies, banco, projetos privados, simulação executada ou validação elétrica. Publicar a vitrine não publica dados do Studio.
