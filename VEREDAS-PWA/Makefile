DC := docker compose

.PHONY: up down up-all down-all restart-all status logs \
	up-hub down-hub up-portal-aluno down-portal-aluno up-pwa-motorista down-pwa-motorista up-pwa-monitor down-pwa-monitor up-pwa-paciente down-pwa-paciente

up: up-all

down: down-all

up-all:
	$(DC) up -d --build

down-all:
	$(DC) down

restart-all:
	$(MAKE) down-all
	$(MAKE) up-all

status:
	$(DC) ps -a

logs:
	$(DC) logs --tail=120

up-hub:
	$(DC) up -d --build hub

down-hub:
	$(DC) stop hub

up-portal-aluno:
	$(DC) up -d --build portal-aluno

down-portal-aluno:
	$(DC) stop portal-aluno

up-pwa-motorista:
	$(DC) up -d --build pwa-motorista

down-pwa-motorista:
	$(DC) stop pwa-motorista

up-pwa-monitor:
	$(DC) up -d --build pwa-monitor

down-pwa-monitor:
	$(DC) stop pwa-monitor

up-pwa-paciente:
	$(DC) up -d --build pwa-paciente

down-pwa-paciente:
	$(DC) stop pwa-paciente