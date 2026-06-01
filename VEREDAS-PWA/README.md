# VEREDAS-PWA (Angular)

Repositorio dedicado aos canais web/PWA do ecossistema VEREDAS.

## Aplicacoes

- hub: entrada central dos apps PWA
- portal-aluno: experiencia publica para aluno e familia
- pwa-motorista: operacao de bordo
- pwa-monitor: supervisao operacional
- pwa-paciente: experiencia de saude e transporte sanitario

## Estrategia de contexto

Todas as apps usam a biblioteca compartilhada pwa-shell:

1. tenta contexto local do Edge em http://localhost:9080/api/v1/context
2. em falha, usa fallback web no Core em http://localhost:8000/api/v1/pwa/context/{role}

## Rodar em desenvolvimento

- npm install
- ng serve hub --port 4400
- ng serve portal-aluno --port 4401
- ng serve pwa-motorista --port 4402
- ng serve pwa-monitor --port 4403
- ng serve pwa-paciente --port 4404

## Rodar em Docker

- make up-all
- make down-all
- make status
- make logs

## Publicacao

Cada app e independente e pode ser publicada separadamente.