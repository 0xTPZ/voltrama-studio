# Decisões técnicas públicas

## 2026-10-29 — Fundação sem dependências

Para M0-001, a interface usa HTML, CSS e JavaScript nativos. Isso reduz superfície de dependências enquanto os contratos de domínio ainda estão sendo definidos. A arquitetura permite migrar componentes para um framework quando o canvas e o estado do projeto exigirem isso.

## 2026-10-29 — Interoperabilidade por adaptadores

KiCad, ngspice e designElectronics serão tratados como adaptadores isolados. O núcleo não reimplementará formatos ou simuladores existentes sem justificativa técnica. Ver `docs/INTEGRATIONS.md`.
