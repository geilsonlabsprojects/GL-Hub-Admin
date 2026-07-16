# GL Hub Admin 🚀

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white)](https://firebase.google.com/)

Painel administrativo profissional para gerenciamento do ecossistema **GL Hub**. Desenvolvido com foco em performance, escalabilidade e experiência do usuário seguindo os princípios do Material Design 3.

---

## ✨ Funcionalidades

- 📊 **Dashboard Inteligente:** Métricas em tempo real de aplicativos, sites e downloads.
- 📱 **Gestão de Apps:** CRUD completo com upload de ícones, banners e screenshots (via ImgBB).
- 🌐 **Gestão de Sites:** Gerenciamento de portfólio web com verificação de slugs únicos.
- 📁 **Categorias & Conteúdo:** Organização dinâmica de conteúdo para o aplicativo móvel.
- 🖼️ **Banners & Slides:** Gerenciador de campanhas e carrossel da home com agendamento.
- 📤 **Upload Otimizado:** Compressão de imagens no navegador antes do upload.
- 🌓 **Tema Dark/Light:** Interface adaptativa com suporte total a temas.

## 🛠️ Tech Stack

- **Core:** React 19 + Vite 5
- **Linguagem:** TypeScript
- **Estilização:** Tailwind CSS + Material Design 3
- **Gerenciamento de Estado:** React Hooks + Context API
- **Banco de Dados:** Firebase Realtime Database
- **Autenticação:** Firebase Auth (Google Login)
- **Formulários:** React Hook Form + Zod

## 🚀 Como Iniciar

### Pré-requisitos
- Node.js (v18+)
- Conta no Firebase
- Chave de API do ImgBB

### Instalação

1. Clone o repositório e navegue até a pasta:
   ```bash
   cd admin
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:
   - Copie o arquivo `.env.example` para `.env`.
   - Preencha com suas credenciais do Firebase e ImgBB.

4. Execute o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

## 📦 Build & Deploy

### Gerar Build
```bash
npm run build
```

### Deploy no GitHub Pages
O projeto já está configurado com **GitHub Actions**. Para publicar:
1. Adicione os segredos (secrets) no seu repositório no GitHub (veja `.env.example`).
2. Faça um push para a branch `main`.
3. O deploy será feito automaticamente para a branch `gh-pages`.

## 📁 Estrutura de Pastas

```text
src/
├── components/   # Componentes reutilizáveis (UI, Apps, Sites, etc)
├── contexts/     # Provedores de estado global
├── hooks/        # Lógica e chamadas de API (React Query)
├── models/       # Definições de tipos e esquemas Zod
├── pages/        # Telas principais da aplicação
├── repositories/ # Camada de persistência (Firebase)
├── services/     # Lógica de negócio e integrações externas
├── utils/        # Funções utilitárias e ajudantes
└── main.tsx      # Ponto de entrada
```

---

## 📄 Licença
Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para detalhes.

Desenvolvido por **Geilson Silva** - [Geilson Labs](https://github.com/geilson)
