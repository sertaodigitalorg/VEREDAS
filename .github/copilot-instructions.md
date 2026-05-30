# VEREDAS Workspace Guidelines

## Workspace Model

- Treat `VEREDAS-Core` and `VEREDAS-Edge` as separate WSL Docker stacks.
- Use each stack's `Makefile` for routine operations before inventing ad-hoc commands.
- Use the root `Makefile` or `scripts/wsl-stacks.ps1` when a task spans both stacks.

## Architecture

- `VEREDAS-Core` is the central platform: Symfony API, Angular admin, PostgreSQL, Redis, MQTT, pgAdmin.
- `VEREDAS-Edge` is the embedded stack: Node local API, SQLite with WAL, PWAs, MQTT.
- Edge-to-Core sync must use the Core HTTP endpoint exposed by the Core stack.

## Build And Validation

- Validate focused slices first: `make status`, targeted service logs, narrow builds, then wider stack checks.
- Prefer WSL-native execution for Docker and `make` commands.
- Keep documentation synchronized whenever stack topology, ports, operational commands, or custom workflows change.

## Conventions

- Core main database is PostgreSQL in Docker.
- Edge embedded database is SQLite in the local API container.
- Keep shared operational knowledge in `.github/agents` and `.github/skills` so future work stays consistent.