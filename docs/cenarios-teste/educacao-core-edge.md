# Cenario Integrado de Educacao entre Core e Edge

## Objetivo

Testar a jornada completa do transporte escolar no contexto geral do VEREDAS, do cadastro central ate a entrega do aluno em casa e a reconciliacao dos eventos.

## Fluxo resumido

1. O gestor importa ou cadastra o aluno no Core.
2. O Core avalia elegibilidade e, se necessario, coloca o aluno em fila de espera.
3. O gestor libera vaga, vincula rota e publica a carga para o Edge.
4. O Edge importa a viagem do dia, opera ida e volta e registra presenca, ausencia e entrega.
5. O Core recebe os eventos reconciliados e fecha a trilha auditavel do atendimento.

## Personas observadas

- gestor: controla cadastro, fila, vaga e auditoria;
- aluno: percorre ida, permanencia escolar e retorno;
- responsavel: acompanha vaga, liberacao e entrega;
- motorista: executa a rota recebida do Edge;
- monitor: confirma embarque, ausencia e desembarque.

## Onde aprofundar

- detalhamento do Core: [VEREDAS-Core/docs/modulos/cenarios-reais-teste.md](https://github.com/sertaodigitalorg/VEREDAS-Core/blob/main/docs/modulos/cenarios-reais-teste.md)
- detalhamento do Edge: [VEREDAS-Edge/docs/operacao/cenarios-reais-teste.md](https://github.com/sertaodigitalorg/VEREDAS-Edge/blob/main/docs/operacao/cenarios-reais-teste.md)
