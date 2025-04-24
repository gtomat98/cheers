
# 🥂 Cheers – Plataforma Web de Nutrição

**Cheers** é uma plataforma web voltada para o acompanhamento nutricional inteligente e acessível. O sistema permite que usuários cadastrem e monitorem suas refeições, acessem dietas personalizadas, e acompanhem seu progresso diário — tudo com uma interface amigável e sincronização com o celular via **Google Tasks**.

## 🚀 Tecnologias Utilizadas

- **Frontend:** React.js, Next.js, TypeScript, HTML, CSS
- **Backend:** Node.js, Prisma ORM, SQL, API REST
- **Agendador:** Node-Cron
- **Integrações:** Google Tasks API
- **Outros:** GitHub, Vercel

## 💡 Funcionalidades Principais

- ✅ Autenticação de usuários
- 📋 Cadastro e consulta de dietas e refeições
- 📈 Acompanhamento diário das metas alimentares
- 🔄 Sincronização com **Google Tasks**: as refeições são convertidas em tarefas no aplicativo de celular do usuário
- 🔒 Controle de acesso por **middlewares personalizados** para proteger dados sensíveis
- ⏰ Tarefas automatizadas com **Node-Cron** para atualização e limpeza de dados periodicamente

## 📱 Sincronização com Google Tasks

Para aumentar a praticidade, o Cheers permite que cada refeição cadastrada seja enviada automaticamente para o **Google Tasks**, possibilitando que o usuário visualize e marque suas refeições diretamente do celular, como se fossem tarefas do dia.

## 🛠️ Como Rodar Localmente

> Requisitos: Node.js, npm, PostgreSQL, Conta Google com acesso à API de Tarefas habilitada

```bash
# Clone o repositório
git clone https://github.com/gtomat98/cheers.git

# Acesse a pasta do projeto
cd cheers

# Instale as dependências
npm install

# Configure o .env com suas variáveis de ambiente
cp .env.example .env

# Rode as migrações do banco
npx prisma migrate dev

# Inicie o servidor de desenvolvimento
npm run dev
```

## 🌐 Deploy

A aplicação está hospedada em:  
🔗 [cheers-seven.vercel.app](https://cheers-seven.vercel.app)

## 👤 Autor

Desenvolvido por **Matheus D' Afonseca e Silva**  
📧 [matheus.dafonseca2004@gmail.com](mailto:matheus.dafonseca2004@gmail.com)  
🔗 [LinkedIn](https://abrir.link/dVJdc)  
🐙 [GitHub](https://github.com/gtomat98)
