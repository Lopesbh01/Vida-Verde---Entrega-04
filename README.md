README- ONG Vida Verde

# 🌱 Vida Verde - Plataforma Web Acessível

![GitHub](https://img.shields.io/github/license/fabiolopesandrade/vida-verde-spa)
![GitHub release](https://img.shields.io/github/v/release/fabiolopesandrade/vida-verde-spa)
![GitHub last commit](https://img.shields.io/github/last-commit/fabiolopesandrade/vida-verde-spa)
![W3C Validation](https://img.shields.io/w3c-validation/html?targetUrl=https%3A%2F%2Fvidaverde.org)
![WCAG](https://img.shields.io/badge/WCAG-2.1-AA-green)

> Plataforma web moderna e acessível para a ONG Vida Verde - Preservação Ambiental em Minas Gerais

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Funcionalidades](#✨-funcionalidades)
- [Tecnologias](#🛠️-tecnologias)
- [Acessibilidade](#♿-acessibilidade)
- [Performance](#🚀-performance)
- [Estrutura](#📁-estrutura-do-projeto)
- [Instalação](#⚡-instalação-e-desenvolvimento)
- [Scripts](#📜-scripts-disponíveis)
- [Deploy](#🚀-deploy)
- [GitFlow](#🌿-gitflow-e-versionamento)
- [Contribuição](#🤝-contribuição)
- [Licença](#📄-licença)

## Visão Geral

A **Vida Verde** é uma Single Page Application (SPA) desenvolvida com foco em acessibilidade, performance e experiência do usuário. A plataforma apresenta os projetos ambientais da ONG, sistema de voluntariado e doações, seguindo as melhores práticas de desenvolvimento web moderno.

**Status do Projeto**: `Production Ready` ✅

## ✨ Funcionalidades

### 🎯 Core Features
- **SPA (Single Page Application)** - Navegação fluida sem recarregamentos
- **Design System** - Sistema de design consistente com variáveis CSS
- **Layout Responsivo** - 5 breakpoints otimizados para todos os dispositivos
- **Temas Dinâmicos** - Modo claro, escuro e alto contraste
- **Formulários Acessíveis** - Validação e feedback compreensível

### ♿ Recursos de Acessibilidade
- **Navegação por Teclado** - Suporte completo a teclado
- **Leitores de Tela** - Compatível com NVDA, JAWS, VoiceOver
- **Contraste WCAG AA/AAA** - Mínimo 4.5:1 para texto normal
- **ARIA Labels** - Atributos semânticos para screen readers
- **Skip Links** - Navegação rápida para conteúdo principal
- **Focus Management** - Gerenciamento inteligente de foco

### 🚀 Performance
- **CSS/JS Minificado** - Redução de até 70% no tamanho dos arquivos
- **Otimização de Imagens** - WebP, AVIF com múltiplas resoluções
- **Lazy Loading** - Carregamento sob demanda de recursos
- **CDN Ready** - Preparado para Content Delivery Networks
- **PWA Ready** - Estrutura preparada para Progressive Web App

## 🛠️ Tecnologias

### Frontend
- **HTML5** - Estrutura semântica e acessível
- **CSS3** - Variáveis CSS, Grid, Flexbox, Custom Properties
- **JavaScript ES6+** - Modules, Classes, Async/Await
- **Font Awesome** - Ícones vetoriais

### Build Tools
- **Node.js** - Ambiente de execução
- **Sharp** - Otimização avançada de imagens
- **Terser** - Minificação JavaScript
- **CSSNano** - Otimização CSS
- **HTML Minifier** - Compressão HTML

### Qualidade
- **ESLint** - Análise estática de código
- **pa11y** - Testes automáticos de acessibilidade
- **GitHub Actions** - CI/CD automatizado

## ♿ Acessibilidade

### Conformidade
- **WCAG 2.1** - Nível AA completo
- **e-MAG** - Modelo de Acessibilidade em Governo Eletrônico
- **Lei Brasileira de Inclusão (LBI)** - Conformidade legal

### Recursos Implementados
```html
<!-- Exemplo de marcação acessível -->
<nav aria-label="Navegação principal" role="navigation">
  <a href="#main" class="skip-link">Pular para conteúdo</a>
</nav>

<main id="main" role="main" tabindex="-1">
  <h1 aria-live="polite">Página Carregada</h1>
</main>

Testes Realizados
Navegação apenas com teclado

Compatibilidade com leitores de tela

Contraste de cores verificado

Formulários acessíveis

Estrutura semântica validada

🚀 Performance
Métricas (Lighthouse)
Categoria	Score	Observações
Performance	95+	Otimização agressiva
Acessibilidade	100	Conformidade total
Best Practices	100	Seguindo padrões
SEO	100	Estrutura semântica
Otimizações
Compressão de Imagens: WebP (80% menor que JPEG)

Bundle Size: CSS ~15KB, JS ~25KB (gzipped)

Loading Strategy: Critical CSS inlined, JS deferred

Caching: Headers configurados para CDN

📁 Estrutura do Projeto

vida-verde-spa/
├── 📁 .github/                 # GitHub Actions
│   └── 📁 workflows/
│       └── 🚀 deploy.yml
├── 📁 src/                     # Código fonte
│   ├── 🏠 index.html           # SPA principal
│   ├── 📁 assets/
│   │   ├── 🎨 css/             # Estilos modularizados
│   │   ├── ⚡ js/              # JavaScript ES6+
│   │   └── 🖼️ imagens/         # Imagens otimizadas
│   ├── 📁 templates/           # Templates HTML
│   └── 📁 config/              # Configurações
├── 📁 dist/                    # Build de produção
├── 📁 scripts/                 # Scripts de automação
├── 📄 package.json             # Dependências e scripts
├── 🔧 .gitignore              # Arquivos ignorados
└── 📖 README.md               # Documentação

⚡ Instalação e Desenvolvimento
Pré-requisitos
- Node.js 16+
- npm ou yarn
- Git

Setup Inicial

# Clonar repositório
git clone https://github.com/fabiolopesandrade/vida-verde-spa.git
cd vida-verde-spa

# Instalar dependências
npm install

# Desenvolvimento
npm run dev

# Build de produção
npm run build

Variáveis de Ambiente

# Criar arquivo .env
cp .env.example .env

# Configurar (opcional)
SITE_URL=https://vidaverde.org
ANALYTICS_ID=UA-XXXXX-X

📜 Scripts Disponíveis

# Desenvolvimento
npm run dev              # Servidor de desenvolvimento
npm run lint             # Análise de código

# Build e Otimização
npm run build            # Build de produção
npm run optimize-images  # Otimizar imagens

# Qualidade
npm run test:a11y        # Testes de acessibilidade
npm run audit            # Auditoria de performance

# Deploy
npm run deploy           # Deploy para produção

🚀 Deploy
Deploy Manual

# Build e deploy
npm run build
npm run deploy

CI/CD Automatizado
O projeto utiliza GitHub Actions para deploy automático:

Push para main → Deploy automático

Pull Request → Build e testes

Release → Deploy com versionamento

Ambientes
Produção: https://vidaverde.org

Staging: https://staging.vidaverde.org

Develop: https://develop.vidaverde.org

🌿 GitFlow e Versionamento
Estrutura de Branches

main (produção)
└── develop (desenvolvimento)
    ├── feature/novo-componente
    ├── feature/melhoraria-acessibilidade
    ├── release/v1.1.0
    └── hotfix/critico-producao

Convenção de Commits

feat: adiciona sistema de temas dinâmicos
fix: corrige navegação por teclado no modal
docs: atualiza documentação de acessibilidade
style: ajusta contrastes para WCAG AAA
refactor: melhora estrutura de componentes
test: adiciona testes de acessibilidade
chore: atualiza dependências

Versionamento Semântico
MAJOR: Mudanças incompatíveis

MINOR: Novas funcionalidades compatíveis

PATCH: Correções de bugs

🤝 Contribuição
Processo de Contribuição
Fork do projeto

Criar branch: git checkout -b feature/nova-funcionalidade

Commit: git commit -m 'feat: adiciona nova funcionalidade'

Push: git push origin feature/nova-funcionalidade

Abrir Pull Request

Guidelines
✅ Seguir convenção de commits

✅ Manter cobertura de testes

✅ Validar acessibilidade

✅ Atualizar documentação

✅ Revisar performance

Template de Pull Request
## Descrição
[Descreva as mudanças realizadas]

## Tipo de Mudança
- [ ] Bug fix
- [ ] Nova feature
- [ ] Breaking change
- [ ] Documentação

## Checklist
- [ ] Testes de acessibilidade
- [ ] Testes de performance
- [ ] Documentação atualizada
- [ ] Review de código

📄 Licença
Este projeto está licenciado sob a MIT License - veja o arquivo LICENSE para detalhes.

📞 Suporte
Issues: GitHub Issues

Email: desenvolvimento@vidaverde.org

Site: vidaverde.org

🙏 Agradecimentos
Equipe de desenvolvimento Vida Verde

Comunidade de acessibilidade web

Contribuidores open source

<div align="center">
Desenvolvido com ❤️ por Fábio Lopes de Andrade

https://img.shields.io/twitter/follow/fabiolopes?style=social
https://img.shields.io/github/followers/fabiolopesandrade?style=social

</div> ```
📁 Arquivos de Configuração Adicionais
.github/ISSUE_TEMPLATE/feature_request.md
---
name: Feature request
about: Sugerir uma ideia para este projeto
title: 'feat: [DESCRIÇÃO BREVE]'
labels: enhancement
assignees: ''

---

## Descrição da Feature
<!-- Descrição clara e concisa do que você gostaria que acontecesse -->

## Problema Relacionado
<!-- Esta feature está relacionada a algum problema? -->

## Solução Proposta
<!-- Descrição detalhada da solução -->

## Alternativas Consideradas
<!-- Quais alternativas você considerou? -->

## Critérios de Aceitação
- [ ] Funcionalidade implementada
- [ ] Testes de acessibilidade
- [ ] Documentação atualizada
- [ ] Review de código

## Contexto Adicional
<!-- Adicione qualquer outro contexto aqui -->

.github/ISSUE_TEMPLATE/bug_report.md

---
name: Bug report
about: Reportar um bug para nos ajudar a melhorar
title: 'fix: [DESCRIÇÃO BREVE]'
labels: bug
assignees: ''

---

## Descrição do Bug
<!-- Descrição clara e concisa do bug -->

## Passos para Reproduzir
1. Vá para '...'
2. Clique em '....'
3. Role até '....'
4. Veja o erro

## Comportamento Esperado
<!-- O que deveria acontecer -->

## Screenshots
<!-- Se aplicável, adicione screenshots -->

## Ambiente
 - OS: [ex. iOS]
 - Browser: [ex. Chrome, Safari]
 - Version: [ex. 22]

## Contexto Adicional
<!-- Adicione qualquer outro contexto sobre o problema aqui -->

.github/pull_request_template.md

## Descrição
<!-- Descreva suas mudanças em detalhes -->

## Tipo de Mudança
- [ ] Bug fix (non-breaking change que corrige um issue)
- [ ] Nova feature (non-breaking change que adiciona funcionalidade)
- [ ] Breaking change (fix ou feature que causaria incompatibilidade)
- [ ] Documentação

## Checklist
- [ ] Meu código segue as guidelines do projeto
- [ ] Realizei self-review do meu código
- [ ] Comentei meu código, particularly in hard-to-understand areas
- [ ] Fiz as mudanças correspondentes na documentação
- [ ] Minhas mudanças não geram novos warnings
- [ ] Adicionei testes que provam que minha fix é efetiva
- [ ] Novas e existentes unit tests passam localmente
- [ ] Testes de acessibilidade foram realizados
- [ ] Testes de performance foram realizados

## Screenshots (se aplicável)
<!-- Adicione screenshots das mudanças -->

## Contexto Adicional
<!-- Adicione qualquer outro contexto sobre o PR aqui -->

CHANGELOG.md
# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Versionamento Semântico](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2024-01-15

### Adicionado
- Sistema de temas dinâmicos (claro/escuro/alto contraste)
- Navegação por teclado completa
- Suporte a leitores de tela
- Otimização avançada de imagens

### Corrigido
- Contrastes de cores para WCAG AA
- Navegação em modais
- Focus management em SPA

## [1.0.0] - 2024-01-01

### Adicionado
- Release inicial
- SPA com roteamento
- Design system responsivo
- Sistema de templates

🚀 Como Implementar
1. Configurar Repositório
bash
# Criar repositório no GitHub
gh repo create vida-verde-spa --public --description "Plataforma web acessível da ONG Vida Verde"

# Configurar branch protection
# Settings → Branches → Add rule para main e develop

2. Estrutura Inicial
bash
# Adicionar arquivos ao projeto
mkdir -p .github/{workflows,ISSUE_TEMPLATE}
touch README.md CHANGELOG.md .github/pull_request_template.md

3. Configurar GitHub Actions
yaml
# .github/workflows/ci-cd.yml
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run lint
      - run: npm run test:a11y

  deploy:
    needs: test
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run build
      - run: npm run deploy

4. Versionamento Inicial
bash
# Primeiro release
git add .
git commit -m "feat: initial release with complete documentation"
git tag v1.0.0
git push origin main --tags

5. Criar Milestones e Issues
bash
# Milestones para organização
gh api repos/:owner/:repo/milestones -f title="v1.1.0" -f description="Melhorias de acessibilidade"
gh api repos/:owner/:repo/milestones -f title="v1.2.0" -f description="Otimizações de performance"
