<h1 align="center">Travel Control</h1>

## Project

An application created to control the travels of an ore transport company

## How to execute

- Clone the repository `git clone git@github.com:caleb-freitas/travel-control.git`

- Go to the folder that was cloned: `cd travel-control`

- Add database credentials to [.example.env.dev](./.example.env.dev) file and rename it to `.env.dev`

- Add a `jwt_secret_key` to [env.example.ts](src/main/config/env.example.ts) file and rename it to `.env.ts`

- Run `npm install` to install the dependencies

- Start a database on `localhost:5432` with the `docker-compose up -d` command

- Run `npm run migrate:dev` to create the tables on the development database

- Run `npm start:dev` to start the application

> The api documentation will be available on `http://localhost:5050/api-docs`

## How to test

- Add database credentials to [.example.env.test](./.example.env.test) file and rename it to `.env.test`

- Run `npm run migrate:test` to create the tables on the test database

- Run `npm run test:unit` to run unit tests

- Run `npm run test:integration` to run integration tests

- Run `npm run test:e2e` to run end to end tests

- Run `npm run test:verbose` to run all the tests with coverage report

## Technologies

- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/)
- [Prisma](https://www.prisma.io/)
- [Jest](https://jestjs.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [JSON Web Token](https://jwt.io/)
