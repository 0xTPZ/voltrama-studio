# Contratos de API — proposta

Os contratos abaixo são a fronteira futura entre Studio, Community e agentes. Ainda não são endpoints implementados.

| Operação | Regra mínima |
| --- | --- |
| Criar projeto | Servidor força `visibility=privado`. |
| Listar autorizados | Sessão e ACL por objeto; nunca listar por ID sem autorização. |
| Editar projeto | Controle de versão e conflito. |
| Componentes/documentos | Validação de tipo, origem e permissões. |
| Propor publicação | Gera prévia sem efeito público. |
| Publicar | Exige confirmação explícita de uma versão/snapshot. |

Uma futura API/MCP deve usar autenticação, escopos curtos, auditoria, revogação e limites por projeto. O agente não é administrador da plataforma.
