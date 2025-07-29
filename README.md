# Encurtador de Links com Node.js e Fastify

Um serviço de backend robusto e eficiente para encurtar URLs, construído com foco em boas práticas de desenvolvimento, performance e escalabilidade. A aplicação utiliza um stack moderno com Node.js, Fastify, TypeScript e Prisma.

## 🚀 Como Funciona

O projeto consiste em uma API REST que oferece as seguintes funcionalidades:

1.  **Encurtar URL:** Recebe uma URL longa e gera um código único e curto para ela.
2.  **Redirecionar:** Ao acessar o link curto, o serviço redireciona o usuário para a URL original.
3.  **Listar Links:** Expõe um endpoint para visualizar todos os links já encurtados.

A aplicação foi projetada com uma estrutura modular, separando rotas, lógica de banco de dados e configurações de ambiente para facilitar a manutenção e a adição de novas funcionalidades.

## ✨ Features

  - **Encurtamento de URLs:** Geração de códigos únicos e curtos com a biblioteca `nanoid`.
  - **Redirecionamento Rápido:** Uso de redirecionamento `301 Moved Permanently` para performance e boas práticas de SEO.
  - **Validação de Dados:** Schema de validação de entrada e saída com [Zod](https://zod.dev/) para garantir a integridade dos dados.
  - **Banco de Dados com Prisma:** ORM moderno e type-safe para interagir com o banco de dados.
  - **Pronto para Deploy:** Configurado para fazer deploy em plataformas como o [Render](https://render.com) com banco de dados PostgreSQL.
  - **Estrutura Escalável:** Código organizado em rotas e plugins, seguindo as melhores práticas do Fastify.

## 🛠️ Tecnologias Utilizadas

  - [Node.js](https://nodejs.org/)
  - [Fastify](https://www.fastify.io/)
  - [TypeScript](https://www.typescriptlang.org/)
  - [Prisma](https://www.prisma.io/)
  - [PostgreSQL](https://www.postgresql.org/)
  - [Zod](https://zod.dev/)
  - [Nanoid](https://github.com/ai/nanoid)

## ⚙️ Começando (Setup Local)

Siga os passos abaixo para rodar o projeto na sua máquina.

### Pré-requisitos

  - [Node.js](https://nodejs.org/) (versão 18 ou superior)
  - [npm](https://www.npmjs.com/), [Yarn](https://yarnpkg.com/) ou [pnpm](https://pnpm.io/)
  - Uma instância do **PostgreSQL** rodando (pode ser via Docker ou uma instalação local).

### Passos

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/edumaia85/url-shortener.git
    cd url-shortener
    ```

2.  **Instale as dependências:**

    ```bash
    npm install
    ```

3.  **Configure as variáveis de ambiente:**
    Copie o arquivo de exemplo `.env.example` para um novo arquivo chamado `.env`.

    ```bash
    cp .env.example .env
    ```

    Agora, abra o arquivo `.env` e preencha com as suas informações.

    `.env.example`

    ```env
    # URL de conexão com seu banco de dados PostgreSQL
    DATABASE_URL="postgresql://USUARIO:SENHA@HOST:PORTA/NOME_DO_BANCO"

    # Porta em que a aplicação irá rodar
    PORT=3333
    ```

4.  **Execute as migrações do banco de dados:**
    Este comando irá criar as tabelas no seu banco de dados com base no `schema.prisma`.

    ```bash
    npx prisma migrate dev
    ```

5.  **Inicie o servidor de desenvolvimento:**

    ```bash
    npm run dev
    ```

    O servidor estará rodando em `http://localhost:3333`.

## 📖 Documentação da API

### `POST /url/shorten`

Encurta uma nova URL.

**Request Body:**

```json
{
  "url": "https://github.com/fastify/fastify"
}
```

**Success Response (201 Created):**

```json
{
  "shortLink": "http://localhost:3333/aBcDe123"
}
```

**Error Response (400 Bad Request):**

```json
{
  "message": "Erro de validação.",
  "issues": {
    "url": [
      "Link inválido. Forneça um link válido para prosseguir!"
    ]
  }
}
```

-----

### `GET /url/:code`

Redireciona para a URL original correspondente ao código.

**Uso:**
Abra o `shortLink` retornado (ex: `http://localhost:3333/aBcDe123`) em um navegador.

**Responses:**

  - `301 Moved Permanently`: Redireciona para a URL longa.
  - `404 Not Found`: Se o código não for encontrado no banco de dados.

-----

### `GET /url/links`

Lista todos os links já encurtados.

**Success Response (200 OK):**

```json
{
  "links": [
    {
      "id": 1,
      "code": "aBcDe123",
      "originalUrl": "https://github.com/fastify/fastify",
      "createdAt": "2025-07-29T12:30:00.000Z"
    },
    {
      "id": 2,
      "code": "fG3hI45k",
      "originalUrl": "https://www.prisma.io/",
      "createdAt": "2025-07-29T12:35:00.000Z"
    }
  ]
}
```

## ☁️ Deploy

Esta aplicação está pronta para o deploy em plataformas como o **Render**.

  - **Banco de Dados:** Use um serviço de PostgreSQL gerenciado (o Render oferece um plano gratuito).
  - **Build Command:** `npm run build && npx prisma migrate deploy`
  - **Start Command:** `npm start`
  - **Variáveis de Ambiente:** Configure as variáveis (`DATABASE_URL`, etc.) no dashboard do seu provedor de cloud. Lembre-se de usar a **URL Interna** do banco de dados para a `DATABASE_URL` no ambiente de produção.

-----

Feito por **[Eduardo Antônio Maia Valério]**
