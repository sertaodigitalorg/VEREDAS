.PHONY: up-all down-all restart-all status-all logs-all core edge pwa up-pwa down-pwa status-pwa logs-pwa

up-all:
	$(MAKE) -C VEREDAS-Core up-all
	$(MAKE) -C VEREDAS-Edge up-all
	$(MAKE) -C VEREDAS-PWA up-all

down-all:
	$(MAKE) -C VEREDAS-PWA down-all
	$(MAKE) -C VEREDAS-Edge down-all
	$(MAKE) -C VEREDAS-Core down-all

restart-all:
	$(MAKE) down-all
	$(MAKE) up-all

status-all:
	$(MAKE) -C VEREDAS-Core status
	$(MAKE) -C VEREDAS-Edge status
	$(MAKE) -C VEREDAS-PWA status

logs-all:
	$(MAKE) -C VEREDAS-Core logs
	$(MAKE) -C VEREDAS-Edge logs
	$(MAKE) -C VEREDAS-PWA logs

core:
	$(MAKE) -C VEREDAS-Core status

edge:
	$(MAKE) -C VEREDAS-Edge status

pwa:
	$(MAKE) -C VEREDAS-PWA status

up-pwa:
	$(MAKE) -C VEREDAS-PWA up-all

down-pwa:
	$(MAKE) -C VEREDAS-PWA down-all

status-pwa:
	$(MAKE) -C VEREDAS-PWA status

logs-pwa:
	$(MAKE) -C VEREDAS-PWA logs