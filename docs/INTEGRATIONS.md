# Integrações investigadas

## KiCad

Ponto de partida recomendado para interoperabilidade de esquemas, footprints e projetos existentes. A primeira integração deve ser importação/exportação explícita, com preservação de proveniência e testes de round-trip.

## ngspice

Candidato a backend de simulação via adaptador isolado. Nenhum resultado deve aparecer como validado sem executar o netlist, capturar stdout/stderr, versão do solver e artefatos de entrada.

## designElectronics

Tratar como integração exploratória até confirmar API, licença, formato e maturidade no ambiente alvo. Não há funcionalidade implementada nesta missão.

## Próximo passo técnico

Definir interfaces `ProjectAdapter`, `SchematicAdapter` e `SimulationAdapter`, acompanhadas de fixtures mínimas e testes negativos.
