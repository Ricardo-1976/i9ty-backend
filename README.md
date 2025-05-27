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

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# watch mode
$ npm run start:dev

# production mode
$ npm run build  

# development
$ npm run start
```

## 🚀 Executando o Projeto com Docker

### ✅ Rodando em Produção (sem sobrescrever `dist`, sem hot reload)

Use o seguinte comando:

```bash
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build
```

Execute o comando para rodando o app:

```bash
docker compose -f docker-compose.yml -f docker-compose.prod.yml up
```

### 🔍 O que esse comando faz:
- Usa o `docker-compose.yml` como base (serviços, imagem, portas, banco de dados, etc.).
- Adiciona as configurações do `docker-compose.prod.yml` para:
  - **Não montar volumes** (`volumes: []`) → Não apaga o diretório `dist`.
  - Usar o comando `start:prod`, que executa o `dist/main.js`.
- O parâmetro `--build` garante que a imagem seja gerada com o código mais recente e o build atualizado.
- O parâmetro `-d` executa os containers em modo daemon (segundo plano).

### ✅ Para parar os containers:
```bash
docker compose -f docker-compose.yml -f docker-compose.prod.yml down
```

---

### ✅ Rodando em Desenvolvimento (com hot reload e volumes montados)

Execute o comando:

```bash
docker-compose up
```

Ou, para garantir que a imagem seja reconstruída:

```bash
docker-compose up -d --build
```

### 🔍 O que esse comando faz:
- Sobe o container `postgres_db`.
- Sobe o container `backend_app` com:
  - O volume `.:/home/node/app`, refletindo o código local dentro do container.
  - O comando `npm run start:dev`, que utiliza `nest start --watch` para hot reload.

---

### ✅ Configuração do Prisma

#### Migrações para criar o banco de dados:
```bash
npx prisma migrate dev
```

#### Para produção (ex: Docker):
```bash
npx prisma migrate deploy
```

#### Para executar as seeds:
```bash
npm run seed
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
