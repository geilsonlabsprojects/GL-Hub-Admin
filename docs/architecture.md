# Arquitetura do GL Hub Admin

Este documento descreve as decisões arquiteturais e a organização do código do painel administrativo.

## Princípios

1.  **SOLID:** Responsabilidade única em componentes e hooks.
2.  **Clean Architecture:** Separação clara entre UI, lógica de negócio e persistência.
3.  **Repository Pattern:** Toda a comunicação com o Firebase é abstraída em repositórios.
4.  **Service Layer:** Orquestra regras de negócio complexas, como geração de slugs e processamento de imagens.

## Estrutura de Camadas

### 1. Camada de UI (React)
- **Pages:** Telas principais que utilizam hooks para gerenciar o estado e os dados.
- **Components:** Componentes visuais seguindo o Material Design 3. São divididos por contexto (ex: `apps`, `sites`).
- **Contexts:** Gerenciamento de estado global (Autenticação, Tema, Notificações).

### 2. Camada de Lógica (Hooks & Services)
- **Hooks:** Utilizam `@tanstack/react-query` para gerenciar chamadas assíncronas, cache e estados de carregamento.
- **Services:** Implementam regras de negócio que não dependem da UI (ex: `appService.ts`).

### 3. Camada de Dados (Repositories)
- **Repositories:** Classes/Objetos que interagem diretamente com o Firebase Realtime Database. Eles não conhecem a UI, apenas retornam dados ou modelos.

## Fluxo de Dados

`Componente UI` -> `Hook` -> `Service` -> `Repository` -> `Firebase`

---

## Mídias e Upload

As imagens são processadas localmente antes do envio:
1.  O usuário seleciona um arquivo.
2.  `imageUtils.compressImage` redimensiona e comprime usando a Canvas API.
3.  `imgbbService` faz o upload para a API externa.
4.  A URL retornada é salva no Firebase pelo `Repository`.
