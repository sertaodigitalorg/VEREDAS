---
name: veredas-stack-ops
description: 'Operate VEREDAS Core and Edge stacks in WSL Docker. Use for make targets, docker compose lifecycle, health checks, logs, and cross-stack sync validation.'
user-invocable: true
argument-hint: 'Describe the stack task, for example: subir core, validar edge, logs das duas stacks, testar sync edge-core'
---

# VEREDAS Stack Operations

This skill inherits the common workspace standards from `.github/copilot-instructions.md` and adds only stack-operation guidance.

## When To Use

- Start, stop, or inspect the Core stack.
- Start, stop, or inspect the Edge stack.
- Operate both stacks together from the workspace root.
- Validate health, logs, or sync behavior between Edge and Core.

## Standard Entry Points

1. Prefer the stack `Makefile` in `VEREDAS-Core` or `VEREDAS-Edge`.
2. For workspace-wide orchestration, use the root `Makefile` or [wsl wrapper](./scripts/wsl-stacks.sh).
3. When documenting or teaching the workflow, use the stack map in [stack map](./references/stack-map.md).

## Procedure

1. Decide whether the task is Core-only, Edge-only, or cross-stack.
2. Use `make up-all`, `make down-all`, `make status`, `make logs`, or the specific `up-*` / `down-*` targets.
3. For both stacks together, use `make -C /mnt/c/VEREDAS up-all` inside WSL or the wrapper script.
4. Validate with targeted service status and health checks before broader log review.

## Notes

- Core is PostgreSQL-based.
- Edge is SQLite-based.
- Edge sync targets the Core HTTP endpoint exposed on the host.
