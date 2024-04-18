# API da Loja

Esta é uma API para uma loja online, desenvolvida com NestJS, TypeScript, TypeORM e PostgreSQL. A API oferece várias funcionalidades essenciais para a operação de uma loja online, incluindo criação de usuários, gerenciamento de endereços, gerenciamento de produtos, manipulação de carrinho de compras e autenticação de usuários usando JWT Token. (A API está em desenvolvimento no momento).

## Funcionalidades Principais

- **Criação de Usuário**: Permite a criação de novos usuários na plataforma.
- **Criação de Endereço do Usuário**: Permite aos usuários adicionar e gerenciar endereços de entrega.
- **Criação de Produtos**: Permite aos administradores da loja adicionar novos produtos ao catálogo.
- **Inserir Produtos no Carrinho**: Permite aos usuários adicionar produtos ao seu carrinho de compras.
- **Autenticação de Usuário**: Utiliza JWT Token para autenticar usuários e proteger rotas sensíveis.

## Tecnologias Utilizadas


- [x] **NestJS**: Framework Node.js para construção de aplicativos escaláveis e eficientes.
- [x] **TypeScript**: Superset JavaScript que adiciona tipagem estática e outros recursos.
- [x] **TypeORM**: ORM (Object-Relational Mapping) para Node.js, simplificando a interação com o banco de dados.
- [x] **PostgreSQL**: Sistema de gerenciamento de banco de dados relacional.

## Pré-Requisitos

- Node.js e npm instalados.
- PostgreSQL instalado e em execução.
- Docker

## Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/ThiagoMoura963/alessandra-store-backend.git
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Certifique-se de configurar corretamente as variáveis de ambiente antes de iniciar o servidor. Crie um arquivo `.env` e ajuste os valores conforme necessário:
    ```bash
    DB_HOST=127.0.0.1
    DB_PORT=5432
    DB_USERNAME=root
    DB_PASSWORD=root
    DB_NAME=alessandra_store
    DB_ADMIN_EMAIL=admin@root.com
    SALT_PASSWORD=$2b$10$jiRUC90nSOdl4gT/QO.ex.
    JWT_SECRET= XEYeQX50abtnfWrHKLdQToQs7F6NO6ZKe9H45exgc4aTwRaHGErnxllbo3sslsfU
    JWT_EXPIRES_IN=7d
    ```

4. Execute o sistema com Docker:

    ```bash
    docker-compose up
    ```

5. Execute as migrações do banco de dados para criar as tabelas necessárias:

    ```bash
    npm run typeorm migrate:run
    ```

6. Executar o sistema

    ```bash
    # development
    $ npm run start
  
    # watch mode
    $ npm run start:dev
  
    # production mode
    $ npm run start:prod
    ```

7. Executar os testes

    ```bash
    # unit tests
    $ npm run test
    ```
## Documentação da API

A documentação da API foi gerada usando o Swagger e está disponível em [http://localhost:3000/api-docs](http://localhost:3000/api-docs).

Exemplo da documentação (rota de usuário):

  ![image](https://github.com/ThiagoMoura963/alessandra-store-backend/assets/76569184/bb9cdc7a-0992-4661-8907-0f1b0bd09742)


