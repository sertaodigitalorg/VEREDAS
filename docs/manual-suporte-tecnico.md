# Manual de Suporte Técnico do VEREDAS

> **MASTER:** GitHub / Técnico  
> **Documentação funcional relacionada:** Google Drive

## Objetivo

Orientar implantação, subida, validação técnica, criação de usuários, diagnóstico inicial e sustentação operacional do workspace VEREDAS em ambiente local com WSL e Docker.

## Perfil indicado

- suporte técnico;
- implantador;
- responsável por infraestrutura local;
- analista de sustentação.

## O que este manual cobre

- instalação do zero;
- subida das stacks Core e Edge;
- validação técnica do ambiente;
- recuperação inicial em caso de falha;
- criação e manutenção de usuários;
- handoff para operadores funcionais.

Para registrar a execução técnica de forma padronizada, use [matriz-implantacao-tecnica.md](matriz-implantacao-tecnica.md).

## Pré-requisitos técnicos

Antes da instalação, confirme:

1. Windows com WSL habilitado.
2. Docker Desktop com integração WSL ativa.
3. Git instalado.
4. `make` funcional no WSL.
5. Portas `8000`, `9080`, `4300`, `4301` e `4302` livres.

## Instalação do zero

```bash
git clone --recurse-submodules https://github.com/sertaodigitalorg/VEREDAS.git
cd VEREDAS
```

Se necessário inicializar os submódulos depois:

```bash
git submodule update --init --recursive
```

## Subida padrão das stacks

No WSL, a partir de `/mnt/c/VEREDAS`:

```bash
make up-all
```

Para revisar o estado atual:

```bash
make status-all
```

Para ver logs consolidados:

```bash
make logs-all
```

Para derrubar tudo:

```bash
make down-all
```

## Validação técnica inicial

Depois da subida, validar:

1. Core health em `http://localhost:8000/health`
2. Login Core em `http://localhost:8000/pt_BR/login`
3. Edge local API em `http://localhost:9080/health`
4. PWA motorista em `http://localhost:4300`
5. PWA monitor em `http://localhost:4301`
6. Edge admin em `http://localhost:4302`

## Operação por stack

### Core

Dentro de `VEREDAS-Core`:

- `make up-all`
- `make down-all`
- `make status`
- `make logs`
- `make up-core-web`
- `make schema-update`
- `make fixtures-load`
- `make cache-clear`

### Edge

Dentro de `VEREDAS-Edge`:

- `make up-all`
- `make down-all`
- `make status`
- `make logs`
- `make up-local-api`
- `make up-pwa-motorista`
- `make up-pwa-monitor`
- `make up-edge-admin`

## Usuários iniciais e transição para produção funcional

### Credenciais demo

O Core sobe com:

- `jane_admin / kitten`
- `tom_admin / kitten`
- `john_user / kitten`

### Criar usuários definitivos

No Core, criar um novo administrador:

```bash
cd /mnt/c/VEREDAS/VEREDAS-Core
docker compose exec core-web php bin/console app:add-user operador_core SenhaSegura123 operador@prefeitura.gov.br "Operador Core" --admin
```

Criar usuário comum:

```bash
cd /mnt/c/VEREDAS/VEREDAS-Core
docker compose exec core-web php bin/console app:add-user usuario_base SenhaSegura123 usuario@prefeitura.gov.br "Usuario Base"
```

### Handoff para o operador funcional

Antes de entregar o ambiente ao operador:

1. confirmar login com o usuário definitivo;
2. orientar troca de senha no primeiro acesso;
3. confirmar abertura dos hubs de Educação, Saúde e Base Operacional;
4. encaminhar o operador aos manuais funcionais oficiais no Google Drive.

## Troubleshooting inicial

### Core não responde

1. Executar `make -C /mnt/c/VEREDAS/VEREDAS-Core status`
2. Executar `make -C /mnt/c/VEREDAS/VEREDAS-Core logs`
3. Recriar o `core-web` com `make -C /mnt/c/VEREDAS/VEREDAS-Core up-core-web`

### Edge não responde

1. Executar `make -C /mnt/c/VEREDAS/VEREDAS-Edge status`
2. Executar `make -C /mnt/c/VEREDAS/VEREDAS-Edge logs`
3. Subir o serviço afetado com o alvo específico do Makefile.

### Falta de dados demo no Core

```bash
cd /mnt/c/VEREDAS/VEREDAS-Core
make fixtures-load
```

### Alteração de entidade ou schema desatualizado

```bash
cd /mnt/c/VEREDAS/VEREDAS-Core
make schema-update
```

### Cache Symfony desatualizado

```bash
cd /mnt/c/VEREDAS/VEREDAS-Core
make cache-clear
```

## Sequência recomendada de implantação

1. Clonar o workspace.
2. Inicializar submódulos.
3. Subir Core e Edge.
4. Validar os endpoints de health.
5. Confirmar login com usuário demo.
6. Criar usuários definitivos quando necessário.
7. Entregar o ambiente ao operador funcional.
8. Solicitar execução dos roteiros de Educação e Saúde.
9. Recolher evidências e tratar falhas apontadas.

## Entrega para validação funcional

A documentação funcional oficial está no Google Drive:

1. [Manual do Usuário](https://docs.google.com/document/d/1Qz5FKruMFAfu6XgFbEFeb5F335fozN1o8owqgW0hWEY/edit)
2. [Manual do Operador Funcional](https://docs.google.com/document/d/1iEV7CaIQ7bvXc1xUtzO_zu9ZYvmywi8S6sPZuIxVytg/edit)
3. [Pasta de Manuais de Usuário do VEREDAS](https://drive.google.com/drive/folders/1zhqUM-DPXSdPqYs_dhIvPbp69KXHxWmJ)

Os roteiros de teste técnico-funcional continuam versionados neste repositório enquanto não forem reclassificados pela governança documental.

## Referências técnicas

1. [Operação do workspace](operacao.md)
2. [README principal](../README.md)
3. [Core](https://github.com/sertaodigitalorg/VEREDAS-Core/blob/main/README.md)
4. [Edge](https://github.com/sertaodigitalorg/VEREDAS-Edge/blob/main/README.md)
5. [Matriz técnica](matriz-implantacao-tecnica.md)

## Cross-Layer Impact Check

Alterações técnicas que modifiquem comportamento percebido por gestores ou operadores devem provocar revisão dos manuais funcionais no Google Drive. Se a atualização direta não for possível, registrar `PENDING_SYNC` e gerar Prompt Handoff.
