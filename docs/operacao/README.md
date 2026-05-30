# Operacao Geral do Workspace

## Objetivo

Centralizar a operacao conjunta das stacks Core e Edge quando o assunto ultrapassa o contexto de um pacote isolado.

## Comandos da raiz

Use na raiz `c:/VEREDAS`:

- `make up-all`: sobe Core e Edge;
- `make down-all`: derruba Edge e Core;
- `make status-all`: mostra o estado das duas stacks;
- `make logs-all`: mostra logs consolidados das duas stacks.

## Quando operar pela raiz

- validacao integrada entre Core e Edge;
- sincronizacao ponta a ponta;
- revisao de documentacao geral, cenarios e scripts compartilhados.

## Quando operar dentro de cada pacote

- manutencao especifica da API, admin, banco ou integracoes do Core;
- manutencao especifica do `local-api`, PWAs e operacao offline do Edge.

## Referencias especificas

- Core: [../../VEREDAS-Core/README.md](../../VEREDAS-Core/README.md)
- Edge: [../../VEREDAS-Edge/README.md](../../VEREDAS-Edge/README.md)