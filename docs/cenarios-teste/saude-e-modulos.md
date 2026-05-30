# Cenarios Integrados de Saude e Demais Modulos

## Objetivo

Concentrar os cenarios gerais que cruzam cadastro central, despacho operacional, execucao embarcada e retorno de evidencias para o workspace como um todo.

## Saude

1. A central registra solicitacao recorrente ou eventual no Core.
2. O Core prioriza, agrupa e publica a viagem para o Edge.
3. O Edge executa coleta, chegada assistencial, espera e retorno.
4. O Core consolida horarios reais, no-show, reprogramacao e encerramento.

## Administracao, assistencia social, defesa civil e obras

1. A demanda nasce e e aprovada no Core.
2. O roteiro operacional segue para o Edge quando a execucao depende do no embarcado.
3. O Edge registra inicio, marcos operacionais, ocorrencias e encerramento.
4. O Core fecha a trilha auditavel e a evidencia territorial ou institucional.

## Onde aprofundar

- Core: [../../VEREDAS-Core/docs/modulos/cenarios-reais-teste.md](../../VEREDAS-Core/docs/modulos/cenarios-reais-teste.md)
- Edge: [../../VEREDAS-Edge/docs/operacao/cenarios-reais-teste.md](../../VEREDAS-Edge/docs/operacao/cenarios-reais-teste.md)