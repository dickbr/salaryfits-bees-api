# salaryftis-bees-api

A Salaryfits Bees API é uma aplicação RESTful construída para gerenciar mensagens relacionadas a abelhas. Ela fornece uma interface para criar, listar e enviar mensagens para abelhas, facilitando a comunicação e o gerenciamento dessas criaturas.

Esta API é desenvolvida usando o framework NestJS e utiliza o TypeORM para a interação com o banco de dados PostgreSQL. Além disso, ela integra-se com o AWS SQS para o envio de mensagens e possui suporte para testes automatizados com Jest.

## Pré-requisitos

Antes de começar, certifique-se de ter instalado em seu sistema:

- [Node.js](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/)
- Um banco de dados PostgreSQL
- Uma conta AWS com permissões adequadas para acessar o SQS.

## Instalação

Antes de começar, certifique-se de ter o NodeJS e o NPM instalados. Além disso, você precisará de um banco de dados PostgreSQL.

Siga as etapas abaixo para instalar e configurar o projeto:

1. Clone o repositório:
````bash
git clone https://github.com/dickbr/salaryfits-bees-api.git
````

2. Navegue até a pasta do projeto:
````bash
cd salaryfits-bees-api
````

3. Instale as dependências do projeto:
````bash
yarn install
````

4. Crie um arquivo `.env` com as variáveis de ambiente necessárias para o desenvolvimento. Você pode copiar o arquivo `.env.example` e modificar as variáveis conforme necessário:
````bash
cp .env.example .env
````

5. Configure o banco de dados PostgreSQL e outras configurações no arquivo `.env`.

6. Execute as migrações do banco de dados, se necessário:
````bash
yarn migration:run:dev
````

7. Inicie o servidor de desenvolvimento:
````bash
yarn dev
````

O projeto agora deve estar rodando e pronto para ser usado.

### Scripts Disponíveis

- `yarn build`: Compila o projeto para produção.
- `yarn start`: Inicia o servidor em modo de produção.
- `yarn dev`: Inicia o servidor em modo de desenvolvimento.
- `yarn test`: Executa os testes do projeto.
- `yarn migration:gen`: Gera uma nova migração.
- `yarn migration:run`: Executa as migrações pendentes.
- `yarn migration:revert`: Reverte a última migração executada.

## Uso

Este projeto é um serviço RESTful criado com o NestJS. Ele fornece três rotas principais:


### Criar uma abelha

- **Método**: POST
- **URL**: `/bees`
- **Corpo da solicitação**: Um objeto JSON representando uma nova abelha a ser criada. Exemplo: { "name": "Abelha 1" }.
- **Resposta**: Um objeto JSON representando a abelha criada. Exemplo: { name": "Abelha 1", "id": "f3ffda40-e8a8-4f4a-abcd-94aaad0d1649" }


### Listar todas as abelhas

- **Método**: GET
- **URL**: `/bees`
- **Resposta**: Um array de objetos JSON, onde cada objeto representa uma abelha.

Exemplo de resposta: {"list": [{id": "f3ffda40-e8a8-4f4a-abcd-94aaad0d1649", "name": "Abelha 1" }, {"id": "0cbe40fa-48ae-428a-a1de-14af32cd449e", "name": "Abelha 2" }], "count": 2}


### Enviar uma mensagem

- **Método**: POST
- **URL**: `/bees/messages`
- **Corpo da solicitação**: Um objeto JSON representando uma mensagem a ser enviada. Exemplo: { "sender": "Abelha 1", "receiver": "Abelha 2", "content": "Mel encontrado" }
- **Resposta**: Um objeto JSON representando a mensagem enviada.

## Testes

Execute os testes unitários e de integração:

```bash 
yarn test
```

## Licença

Este projeto está licenciado sob a licença [MIT](#).
