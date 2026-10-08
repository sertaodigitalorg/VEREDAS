# VEREDAS — Diretriz de Produto e Arquitetura Municipal
**Versão:** 1.0 | **Data:** 2026-10-08 | **Status:** proposta para revisão em PR

## Decisão de escopo
VEREDAS é uma plataforma open source, modular e interoperável de **gestão, planejamento, operação, monitoramento, fiscalização e inteligência de toda a mobilidade e frota municipal**. O transporte escolar é um domínio especializado, **não o limite do produto**. A solução contempla veículos próprios, cedidos, alugados e terceirizados conforme contratos, bem como máquinas e equipamentos móveis sob gestão municipal, respeitando competências e regras específicas.

## Domínios de negócio
1. **Núcleo institucional:** municípios, secretarias/unidades, papéis, permissões, segregação municipal, auditoria, cadastros e fontes de dados.
2. **Frota e ativos:** veículos, máquinas, proprietários, vínculos, condutores, documentação, pneus, seguros, tributos, abastecimentos, consumo, manutenção, disponibilidade e contratos.
3. **Planejamento e operação:** requisições, aprovação, alocação, rotas, pontos, itinerários, viagens, passageiros autorizados, odômetro, ocorrências, rastreamento e encerramento.
4. **Transporte escolar:** alunos, responsáveis, matrículas, escolas, monitores, SETE/FNDE, i-Educar, PNATE, embarque/desembarque e acompanhamento familiar.
5. **Transporte sanitário:** pacientes, TFD quando aplicável, unidades assistenciais, solicitações, agendamentos, sigilo e viagens de saúde.
6. **Administrativo:** viagens de servidores, secretarias, autorizações e centros de custo.
7. **Coletivo e especial:** linhas, horários, operadores, acessibilidade, transporte assistencial e outros serviços regulados.
8. **Frota operacional:** obras, limpeza, máquinas, horas trabalhadas, deslocamentos e serviços executados.
9. **Financeiro e prestação de contas:** custos por ativo/rota/viagem/beneficiário, contratos, fontes, regras legais versionadas, indicadores e relatórios.
10. **Inteligência e transparência:** mapas, métricas, alertas, manutenção preditiva quando comprovável, fiscalização, relatórios e dados públicos devidamente anonimizados.

## Arquitetura de referência
- `VEREDAS`: workspace, decisões transversais, documentação técnica compartilhada e submódulos.
- `VEREDAS-Core`: Symfony/API, PostgreSQL, Redis, MQTT, governança e cadastros mestres; considerar PostGIS mediante ADR.
- `VEREDAS-Edge`: API local Node.js, SQLite, MQTT, armazenamento de eventos e operação offline-first.
- `VEREDAS-PWA`: Angular para portais e atores operacionais (motorista, monitor, aluno/família, paciente e demais perfis conforme evolução).
- Integrações via adaptadores versionados e contratos verificáveis. Não criar novos repositórios por domínio sem ADR fundamentada.
- Cadastro mestre único para veículo e operador, com vínculos temporais de alocação e regras por domínio; evitar duplicidade, acoplamento e cruzamento indevido de dados sensíveis.

## Operação offline, identidade e monitoramento
- O pacote operacional local é mínimo, criptografado conforme risco, autorizado, versionado e com prazo de validade.
- Registro de viagem, ponto, odômetro, embarque/desembarque, ocorrência e abastecimento sem acesso à internet.
- Fila persistente com event_id único, idempotência, ordenação causal, reconhecimento de recebimento, retentativa e reconciliação; não descartar evento em erro de sincronização.
- RFID/NFC, QR Code e conferência assistida compartilham a mesma abstração de identificação; cartão não deve expor dados pessoais e o UID físico isolado não equivale a autenticação forte.
- O embarque não deve depender da leitura de cartão, de reconhecimento facial ou de conectividade.
- Acompanhamento remoto da família é autorizado, temporário e de acesso mínimo; eventos capturados offline somente se tornam visíveis remotamente após sincronização.
- Geofencing é opcional e nunca bloqueia embarque.
- Localização e dados de menores/pacientes exigem controles de acesso, minimização, prazos de retenção e análise LGPD.

## Escolar: requisitos obrigatórios de VER-001 a VER-040
Os **40 requisitos** da especificação originada de checklist são obrigatórios. A implementação deve preservar os seguintes oito agrupamentos e cardinalidades, sem exclusão silenciosa:
- **VER-001–005 — Importar o SETE (5):** fichas/mapeamentos; planilhas com deduplicação; GPX; divergências i-Educar; reexportação CSV compatível com layout validado.
- **VER-006–010 — Cadastros e mapa (5):** escolas/alunos/pontos/rotas em OSM; motoristas/monitores/remuneração protegida; frota IPVA/seguro/consumo/pneus/Caminho da Escola; fornecedor/malha/reaproveitamento/ativos; informações Educacenso conforme layout oficial.
- **VER-011–016 — Offline e descarga (6):** pacote de motorista com rota/alunos/pontos/veículo/identificador; fila de embarque/odômetro/abastecimento/ocorrência; janelas de sincronização configuráveis (incluindo referência 05h e 12h30 em dias úteis, se aprovada pela gestão); mestre institucional para conciliação; dispositivo atrasado; filas por dispositivo/motorista/dia. Eventos jamais apagados apenas pelo encerramento de viagem.
- **VER-017–022 — Operação diária (6):** viagem com condutor/monitor/veículo/sentido; embarque por lista ou identificador; falta no transporte distinta de falta na aula; km real versus planejado; comunicação familiar por link seguro; cerca de ponto opcional.
- **VER-023–027 — Relatórios (5):** usuários/motoristas/rotas; km e tempos mínimo/médio/máximo exportáveis; previsto/realizado e custo por aluno/km; gastos por fonte e licenças; CACS e dossiê de apoio ao SiGPC conforme disponibilidade e normas vigentes.
- **VER-028–032 — Recurso, salário, manutenção e gasto (5):** fonte em lançamentos; rateios salariais apenas conforme elegibilidade aplicável e segregando recursos próprios; manutenção preventiva/OS; abastecimento/seguro/IPVA/licenciamento/terceirizado/pedágio; bloquear classificações de despesas PNATE indevidas usando regras normativas verificadas e revisão humana.
- **VER-033–037 — Medição do custo (5):** encargos configuráveis; contrato conforme dias operados; consumo real versus referência; previsto/realizado por rota e frota parada; licenças vencidas destacadas.
- **VER-038–040 — Família e cerca (3):** link autorizado de embarque/desembarque sem app; visões escolares e institucionais segregadas; cerca opcional sem impedir embarque.

**Interoperabilidade SETE não equivale automaticamente ao cumprimento de obrigações de uso do SETE.** Conferir versão, layouts oficiais, orientações FNDE e regras contábeis/normativas vigentes antes de afirmar conformidade. A plataforma complementa a utilização institucional exigida.

## Evidência, qualidade e rastreabilidade
Para cada requisito: ID, domínio, responsável (Core/Edge/PWA), implementação, arquivos, testes, evidências, normas/integrações, issue, PR e status: IMPLEMENTADO_TESTADO / IMPLEMENTADO_SEM_TESTE / PARCIAL / DOCUMENTADO / NÃO_LOCALIZADO / BLOQUEADO.
A presença de telas, rotas ou textos não comprova conclusão; executar testes reais e registrar resultados.

## Autoridade documental
Conforme diretriz atualmente registrada em `docs/manual-usuario.md`, manuais e operação funcional possuem MASTER no Google Drive, enquanto documentação técnica, contratos, código, ADRs e testes têm MASTER GitHub. Este arquivo é **diretriz técnica e de produto para revisão**, não substitui o manual funcional oficial. Propor atualização do documento funcional no Drive sem criar cópia concorrente.

## Próximos passos aprováveis
**P0 — Inventário e paridade:** auditar 4 repositórios e seus branches/commits; confrontar VER-001–040 e domínios comuns; mapear código, schema, testes e lacunas; verificar documentação oficial; criar issues sem duplicidade; identificar dependências e riscos.
**P1 — Base compartilhada:** frota, viagens, identidades/papéis, alocações, trilhas e sincronização confiável.
**P2 — Escolar legal/interoperável:** SETE/i-Educar/GPX, PNATE, embarque offline RFID/NFC e relatórios.
**P3 — Saúde, administrativo e operacional:** adaptar fluxo comum com especializações, sigilo e autorizações próprios.
**P4 — Inteligência:** monitoramento, BI, otimização e transparência, apoiados em dados consistentes.

Aplicar mudanças em branches e PRs, respeitando proteção e fluxo vigente. Não usar dados reais sensíveis em fixtures nem executar migrações destrutivas sem autorização.
