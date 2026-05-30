# VEREDAS Workspace

Workspace operacional do VEREDAS com duas stacks Docker independentes rodando no WSL:

- `VEREDAS-Core`: Core central com Symfony, Angular admin, PostgreSQL, Redis, MQTT e pgAdmin;
- `VEREDAS-Edge`: Edge embarcado com `local-api`, PWAs operacionais, MQTT e SQLite embarcado.

## Modelo de repositorios

O workspace passa a trabalhar com tres repositorios relacionados:

- `VEREDAS`: repositorio principal de desenvolvimento integrado, documentacao compartilhada, scripts e ponteiros para os submodulos;
- `VEREDAS-Core`: repositorio independente do Core, clonavel sozinho para servidor, API e administracao central;
- `VEREDAS-Edge`: repositorio independente do Edge, clonavel sozinho para dispositivo embarcado e testes offline.

O vinculo recomendado entre eles e por `git submodule`, nao por fork.

### Quando usar cada repositorio

- desenvolvimento integrado: clonar `VEREDAS` com seus submodulos;
- deploy ou teste apenas do Core: clonar somente `VEREDAS-Core`;
- deploy ou teste apenas do Edge: clonar somente `VEREDAS-Edge`.

### Clonagem recomendada

- workspace completo: `git clone --recurse-submodules https://github.com/sertaodigitalorg/VEREDAS.git`
- baixar submodulos depois: `git submodule update --init --recursive`
- somente Core: `git clone https://github.com/sertaodigitalorg/VEREDAS-Core.git`
- somente Edge: `git clone https://github.com/sertaodigitalorg/VEREDAS-Edge.git`

### Fluxo de manutencao

- evolucoes proprias do Core devem ser commitadas e publicadas em `VEREDAS-Core`;
- evolucoes proprias do Edge devem ser commitadas e publicadas em `VEREDAS-Edge`;
- o repositorio `VEREDAS` versiona o ponteiro exato de cada submodulo, alem de scripts e documentacao compartilhada.

## Documentacao

- arquitetura integrada do workspace: [docs/arquitetura/workspace-geral.md](docs/arquitetura/workspace-geral.md)
- operacao integrada das stacks: [docs/operacao/README.md](docs/operacao/README.md)
- manual do usuario geral: [docs/manual-usuario/README.md](docs/manual-usuario/README.md)
- cenarios de teste integrados: [docs/cenarios-teste/README.md](docs/cenarios-teste/README.md)
- Core: [VEREDAS-Core/docs/README.md](VEREDAS-Core/docs/README.md)
- Edge: [VEREDAS-Edge/docs/README.md](VEREDAS-Edge/docs/README.md)

Esta documentacao compartilhada cobre o que vale para o ecossistema como um todo: arquitetura integrada, operacao das duas stacks, manual do usuario em nivel de plataforma e cenarios de teste que atravessam Core e Edge.

## Operacao padronizada

O fluxo padrao passa sempre pelo WSL com Docker. Os `docker compose` das duas stacks sao independentes e cada stack possui seu proprio `Makefile`.

### Makefiles

- raiz: `c:/VEREDAS/Makefile`
- Core: `c:/VEREDAS/VEREDAS-Core/Makefile`
- Edge: `c:/VEREDAS/VEREDAS-Edge/Makefile`

### Alvos principais

- `make up-all`: sobe todos os servicos da stack atual;
- `make down-all`: derruba todos os servicos da stack atual;
- `make status`: mostra o estado dos containers da stack atual;
- `make logs`: mostra os logs recentes da stack atual.

Na raiz do workspace:

- `make up-all`: sobe Core e Edge;
- `make down-all`: derruba Edge e Core;
- `make status-all`: mostra o estado das duas stacks;
- `make logs-all`: mostra logs das duas stacks.

## Scripts WSL

Tambem existem wrappers para operacao direta no WSL:

- `c:/VEREDAS/scripts/wsl-stacks.ps1`
- `/mnt/c/VEREDAS/scripts/wsl-stacks.sh`

## Customizacoes de agente

As padronizacoes compartilhadas do time ficam em `.github/`:

- `.github/copilot-instructions.md`
- `.github/agents/veredas-stack-operator.agent.md`
- `.github/skills/veredas-stack-ops/SKILL.md`
- `.github/skills/veredas-sync-diagnostics/SKILL.md`