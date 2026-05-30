.PHONY: up-all down-all restart-all status-all logs-all core edge

up-all:
	$(MAKE) -C VEREDAS-Core up-all
	$(MAKE) -C VEREDAS-Edge up-all

down-all:
	$(MAKE) -C VEREDAS-Edge down-all
	$(MAKE) -C VEREDAS-Core down-all

restart-all:
	$(MAKE) down-all
	$(MAKE) up-all

status-all:
	$(MAKE) -C VEREDAS-Core status
	$(MAKE) -C VEREDAS-Edge status

logs-all:
	$(MAKE) -C VEREDAS-Core logs
	$(MAKE) -C VEREDAS-Edge logs

core:
	$(MAKE) -C VEREDAS-Core status

edge:
	$(MAKE) -C VEREDAS-Edge status