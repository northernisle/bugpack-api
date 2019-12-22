# Bugpack API

The back-end part of the Bugpack project. Written in TypeScript with Express and MongoDB.

### Prerequisites
[*Node.js@^13.3.0 with npm@^6.13.1*](https://nodejs.org/en/download/) and [*Docker@^19.03.5*](https://www.docker.com/)

The project requires the following environment variables to be present. Create a `.env` file at the root of the project.  
The example values should be sufficient to get the application up and running.

| Environment Variable  | Example Value       | Description                                           |
| --------------------- | ------------------- | ----------------------------------------------------- |
| `PORT`                | `3001`              | the port that the server will be running on           |
| `DB_IP`               | `mongodb://0.0.0.0` | the mongodb ip that is used when running with npm     |
| `DB_CONTAINER_IP`     | `mongodb://mongo`   | the mongodb ip that is used when running from docker  |
| `DB_PORT`             | `27017`             | the mongodb port                                      |
| `DB_NAME`             | `bugpack-api`       | the name of the database                              |
| `DB_TEST_NAME`        | `bugpack-test-api`  | the name of the database used for tests               |
| `JWT_SECRET`          | `almond-milk`       | the secret that will be used to create JWT            |

### Running the application

Make sure that:
1. The `PORT` that you're running from is available.
2. The database docker container is running.

#### With NPM
1. `npm install`
2. `npm run dev` **OR** `npm run build-start`

#### With Docker
`npm run docker` **OR** `docker-compose up --build -d`

#### Available commands

| Command               | Description                                       |
| --------------------- | ------------------------------------------------- |
| `npm start`           | starts the application from the `dist` folder     |
| `npm run dev`         | start the application in watch mode with nodemon  |
| `npm test`            | runs the test suites with Jest                    |
| `npm run build-start` | combines `npm run build` and `npm start`          |
| `npm run build`       | compiles TS to JS in a `dist` folder              |
| `npm run docker`      | builds/updates the docker containers              |
| `npm run db`          | starts the db container                           |
