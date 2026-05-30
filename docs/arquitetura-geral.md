# Arquitetura Geral do Workspace

## Objetivo

Definir a visao integrada do VEREDAS como workspace de desenvolvimento, operacao e validacao entre o Core central e o Edge embarcado.

## Blocos principais

- `VEREDAS`: repositorio principal com documentacao geral, scripts compartilhados e ponteiros dos submodulos;
- `VEREDAS-Core`: contexto central com API Symfony, admin Angular, banco PostgreSQL, Redis, MQTT e integracoes institucionais;
- `VEREDAS-Edge`: contexto embarcado com `local-api`, PWAs operacionais, SQLite local, MQTT e fluxo offline-first.

## Relacao entre os componentes

1. O Core concentra cadastro mestre, configuracao institucional, filas e governanca operacional.
2. O Edge recebe a carga operacional necessaria para execucao local no veiculo ou no no embarcado.
3. O Edge persiste eventos localmente e reconcilia com o Core quando houver conectividade.
4. O workspace principal organiza a visao transversal, sem substituir a documentacao especifica de cada pacote.

## Onde documentar cada assunto

- temas gerais do ecossistema: no [README principal do workspace](../README.md);
- regras e fluxos especificos do Core: [VEREDAS-Core/docs/README.md](https://github.com/sertaodigitalorg/VEREDAS-Core/blob/main/docs/README.md);
- regras e fluxos especificos do Edge: [VEREDAS-Edge/docs/README.md](https://github.com/sertaodigitalorg/VEREDAS-Edge/blob/main/docs/README.md).
