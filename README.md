<h1 align="center">Travel Control</h1>

## Project

An application created to control the travels of an ore transport company

## How to execute

- Add database credentials to [.example.env](./.example.env) file and rename it to `.env`

- Run `docker-compose up -d` to start the application

> The api documentation will be available at `http://localhost:3000/api-docs`

## How to test

- Add database credentials to [.example.env.test](./.example.env.test) file and rename it to `.env.test`

- Run `npm run migrate:test` to create the tables on the test database

- Run `npm run test:unit` to run unit tests

- Run `npm run test:integration` to run integration tests

- Run `npm run test:e2e` to run end to end tests

- Run `npm run test:verbose` to run all the tests with coverage report
