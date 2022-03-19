<h1 align="center">Travel Control</h1>

## Project

This is an application created to control the travels of an ore transport company

## How to execute

- Clone the repository
- Go to the folder that was cloned `travel-control`
- Add database credentials to `.env.example` file and rename it to `.env`
- Run `npm install` to install the dependencies
- Start a database on `localhost:5432`
- Run `npx prisma migrate dev` to create the tables on the database
- Run `npm start`

The application will be available on `http://localhost:5050`

## APIs

- [Company Signup](docs/signup/company.signup.md)
- [Driver Signup](docs/signup/driver.signup.md)

## Technologies

- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/pt-br/)
- [Prisma](https://www.prisma.io/)
- [Jest](https://jestjs.io/)
- [PostgreSQL](https://www.postgresql.org/)
