<h1 align="center">Travel Control</h1>

## Project

An application created to control the travels of an ore transport company

## How to execute

- Clone the repository `git clone git@github.com:caleb-freitas/travel-control.git`
- Go to the folder that was cloned: `cd travel-control`
- Add database credentials to [.env.example](./.env.example) file and rename it to `.env`
- Add a `jwt_secret_key` to [env.example.ts](src/main/config/env.example.ts) file and rename it to `.env`
- Run `npm install` to install the dependencies
- Start a database on `localhost:5432` with the `docker-compose up -d` command
- Run `npx prisma migrate dev` to create the tables on the database
- Run `npm start` to start the application

> The api documentation will be available on `http://localhost:5050/api-docs`

## Technologies

- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/)
- [Prisma](https://www.prisma.io/)
- [Jest](https://jestjs.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [JSON Web Token](https://jwt.io/)
