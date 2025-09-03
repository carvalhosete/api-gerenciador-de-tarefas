# API de Gestão de Tarefas (Backend)

![Status do Projeto](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)

API RESTful desenvolvida para servir como backend para a aplicação de Gerenciamento de Tarefas. É responsável por toda a lógica de negócio, incluindo autenticação de usuários, autorização baseada em JWT e o gerenciamento completo (CRUD) de tarefas.

Este projeto foi construído com Node.js e Express, utilizando Prisma como ORM para interação com um banco de dados PostgreSQL. A arquitetura foi planejada para ser escalável, segura e de fácil manutenção.

**➡️ [Repositório do Frontend](https://github.com/carvalhosete/gerenciador-tarefas-frontend)**

---

## Arquitetura e Funcionalidades

- **Autenticação:** Sistema completo de registro e login de usuários com senhas criptografadas (bcrypt).
- **Autorização:** Proteção de rotas utilizando JSON Web Tokens (JWT), garantindo que apenas usuários autenticados possam acessar seus próprios recursos.
- **Operações CRUD para Usuários:** Funcionalidades para criar, ler, atualizar e deletar usuários.
- **Operações CRUD para Tarefas:** Funcionalidades para criar, ler, atualizar e deletar tarefas, com relacionamento direto ao usuário proprietário.
- **Validação de Dados:** (A ser implementado) Validação de entrada para garantir a integridade dos dados.
- **Documentação de API:** Geração automática de documentação interativa com Swagger (OpenAPI).

---

## Tecnologias Utilizadas

- **Node.js:** Ambiente de execução para o JavaScript no servidor.
- **Express.js:** Framework para a construção da API e gerenciamento de rotas.
- **Prisma:** ORM (Object-Relational Mapper) de próxima geração para a comunicação com o banco de dados.
- **PostgreSQL:** Banco de dados relacional utilizado para persistir os dados.
- **Docker & Docker Compose:** Para a criação de um ambiente de desenvolvimento conteinerizado e consistente para o banco de dados.
- **JSON Web Token (JWT):** Para a implementação de um sistema de autenticação stateless.
- **Bcrypt.js:** Para a criptografia segura de senhas.
- **Swagger (swagger-autogen & swagger-ui-express):** Para a documentação automática da API.
- **CORS:** Middleware para permitir o compartilhamento de recursos entre o frontend e o backend.

---

## Endpoints da API

A documentação completa e interativa da API está disponível e pode ser acessada após iniciar o servidor.

- **URL da Documentação:** `http://localhost:3000/api-docs`

Principais rotas disponíveis:

- `POST /api/users` - Registrar um novo usuário.
- `POST /api/login` - Autenticar um usuário e receber um token JWT.
- `GET /api/tasks` - Listar todas as tarefas do usuário autenticado.
- `POST /api/tasks` - Criar uma nova tarefa.
- `PUT /api/tasks/:id` - Atualizar uma tarefa existente.
- `DELETE /api/tasks/:id` - Deletar uma tarefa.

---

## Como Rodar o Projeto Localmente

**Pré-requisitos:**

- [Node.js](https://nodejs.org/en/) (versão 16 ou superior)
- [Docker](https://www.docker.com/products/docker-desktop/) e [Docker Compose](https://docs.docker.com/compose/install/)
- [Git](https://git-scm.com/)

**Passos:**

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/carvalhosete/api-gerenciador-de-tarefas.git
    ```

2.  **Navegue até a pasta do projeto:**

    ```bash
    cd api-gerenciador-de-tarefas
    ```

3.  **Instale as dependências do Node.js:**

    ```bash
    npm install
    ```

4.  **Configure as variáveis de ambiente:**

    - Renomeie o arquivo `.env.example` para `.env`.
    - Preencha a variável `DATABASE_URL` com a string de conexão do seu banco de dados. O valor padrão já está configurado para funcionar com o Docker Compose deste projeto.
    - Preencha a variável `JWT_SECRET` com uma chave secreta segura.

5.  **Inicie o contêiner do banco de dados com Docker:**

    ```bash
    docker-compose up -d
    ```

6.  **Aplique as migrações do Prisma para criar as tabelas no banco:**

    ```bash
    npx prisma migrate dev
    ```

7.  **Inicie o servidor:**

    ```bash
    npm run dev
    ```

8.  **Servidor em execução:**
    - A API estará disponível em `http://localhost:3000`.
    - A documentação da API estará em `http://localhost:3000/api-docs`.

---

## Desenvolvedor

- **Leonardo Carvalho**
- **LinkedIn:** https://www.linkedin.com/in/lcarvalho7/
- **GitHub:** https://github.com/carvalhosete
