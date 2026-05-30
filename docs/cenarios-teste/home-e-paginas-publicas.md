# Roteiro de Teste Dev: Home e Paginas Publicas Navegaveis

## Objetivo

Validar que a Home publica e as paginas publicas relacionadas estao navegaveis, com links funcionais e conteudo coerente para o publico externo.

## Escopo

- home publica do Core;
- hub publico de modulos;
- paginas publicas de modulo;
- consistencia de textos, cards e chamadas para acao;
- navegacao entre paginas sem erro HTTP.

## Pre-requisitos (WSL)

1. Subir stack Core:
   - `cd /mnt/c/VEREDAS/VEREDAS-Core`
   - `make up-all`
2. Confirmar health:
   - `http://localhost:8000/health`
3. Usar navegador em janela normal e, quando necessario, em aba anonima para evitar cache residual.

## Status inicial informado

- Validacao manual previa: Home revisada e links da Home funcionando corretamente.

## Matriz de paginas publicas

1. Home publica: `http://localhost:8000/pt_BR`
2. Hub de modulos: `http://localhost:8000/pt_BR/modules`
3. Modulo Educacao: `http://localhost:8000/pt_BR/modules/education`
4. Modulo Saude: `http://localhost:8000/pt_BR/modules/health`
5. Mural publico: `http://localhost:8000/pt_BR/blog`

## Cenario 1: Carregamento da Home publica

### Passos

1. Abrir `http://localhost:8000/pt_BR`.
2. Verificar renderizacao visual do topo, bloco principal e cards laterais.
3. Confirmar presenca da logo no body (lado esquerdo).

### Resultado esperado

- pagina carrega com HTTP 200;
- sem erros visiveis de layout quebrado;
- logo, titulo principal e texto de contexto visiveis.

## Cenario 2: Navegabilidade dos CTAs da Home

### Passos

1. Clicar em `Comunicados internos`.
2. Voltar e clicar em `Entrar no painel` (validar redirecionamento esperado para autenticacao quando nao logado).
3. Clicar em `Hub de modulos`.
4. Clicar em `IA embarcada` (validar comportamento de acesso autenticado quando aplicavel).

### Resultado esperado

- cada CTA abre rota valida;
- quando protegido, o fluxo redireciona para login sem erro 500/404;
- botao de retorno do navegador funciona normalmente.

## Cenario 3: Hub publico de modulos

### Passos

1. Acessar `http://localhost:8000/pt_BR/modules`.
2. Validar cards dos modulos exibidos.
3. Abrir modulo Educacao.
4. Voltar ao hub e abrir modulo Saude.

### Resultado esperado

- hub abre com cards de modulos e secoes publicas;
- links de modulo respondem corretamente;
- sem links quebrados no hub.

## Cenario 4: Conteudo funcional das paginas de modulo

### Passos

1. Em Educacao, validar seccoes principais (descricao, eventos/avisos quando houver).
2. Em Saude, validar descricao, fluxo recomendado e botoes de navegacao.
3. Validar botao de retorno ao hub de modulos.

### Resultado esperado

- textos estao orientados a uso funcional e nao apenas tecnico;
- botoes de navegacao entre modulos/hub funcionam;
- conteudo minimo publico carregado sem placeholders quebrados.

## Cenario 5: Robustez de navegacao publica

### Passos

1. Navegar em sequencia: Home -> Hub de modulos -> Educacao -> Hub -> Saude -> Home.
2. Repetir fluxo em aba anonima.
3. Atualizar pagina com Ctrl+F5 em cada rota principal.

### Resultado esperado

- todas as rotas permanecem navegaveis;
- sem inconsistencias por cache no browser;
- sem erros de internacionalizacao no prefixo `pt_BR`.

## Checklist de aprovacao

- home publica acessivel e estavel;
- links da home validados como funcionais;
- hub publico de modulos acessivel;
- paginas publicas de Educacao e Saude navegaveis;
- sem erro 404/500 nos caminhos publicos testados;
- conteudo funcional compreensivel para publico nao tecnico.

## Evidencias recomendadas

1. Print da Home com cards e logo.
2. Print do Hub de modulos.
3. Print de Educacao.
4. Print de Saude.
5. Registro rapido de status por cenario: Aprovado, Falhou, Bloqueado.
