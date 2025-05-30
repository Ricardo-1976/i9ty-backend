<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Executando o Projeto com Docker

Siga os passos abaixo para compilar, executar e gerenciar o projeto utilizando Docker:

### 1. Construir a Imagem do Container
Para construir a imagem do container, execute:
```bash
docker compose build
```

### 2. Migrar e Seeds ao Banco de Dados
Execute o seguinte comando para aplicar as migrações e seeds o banco de dados:
```bash
docker compose -f docker-compose.yml -f docker-compose.migrate.seed.yml up
```

### 3. Executar Testes End-to-End (E2E)
Para executar os testes end-to-end, utilize:
```bash
docker compose -f docker-compose.yml -f docker-compose.test.yml up
```

### 4. Executar o Projeto em Produção
Você pode iniciar o projeto em modo de produção utilizando o comando abaixo:

- Com uma configuração específica para produção:
  ```bash
  docker compose -f docker-compose.yml -f docker-compose.prod.yml up
  ```
### 5. Executar o Projeto na dev
Você pode iniciar o projeto em modo de produção utilizando o comando abaixo:

- Utilizando a configuração padrão para ambiente de desenvolvimento:
  ```bash
  docker compose up
  ```

### 6. Parar e Remover os Containers
Para interromper e remover todos os containers, incluindo seus volumes, utilize os comandos abaixo:

- Para parar e remover os containers:
  ```bash
  docker compose down
  ```

- Para parar e remover os containers junto com seus volumes:
  ```bash
  docker compose down -v
  ```
