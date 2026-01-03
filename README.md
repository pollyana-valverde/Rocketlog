# RocketLog

Este projeto é uma aplicação desenvolvida durante a trilha de **Fullstack** da **Rocketseat**. O objetivo principal é criar um sistema de rastreamento de entregas e gestão de encomendas.

## 🚀 Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- [Node.js](https://nodejs.org/en/)
- [Express](https://www.express.io/) 
- [Prisma](https://www.prisma.io/) (ORM)
- [PostgreSQL](https://www.postgresql.org/) (Banco de dados)
- [Docker](https://www.docker.com/)

## 💻 Funcionalidades

- **Autenticação**: Login e cadastro de usuáros e vendedores.
- **Gestão de Encomendas**: CRUD completo de encomendas.
- **Rastreamento**: Atualização de status de entrega (Retirada, Entregue, Devolvida).

## 🛠️ Como executar

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/rocketlog.git
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
Crie um arquivo `.env` baseado no `.env.example`.

4. Suba o banco de dados com Docker:
```bash
docker-compose up -d
```

5. Execute as migrações:
```bash
npx prisma migrate dev
```

6. Inicie o servidor:
```bash
npm run dev
```

## 📝 Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.