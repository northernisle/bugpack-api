# Bugpack API

The back-end part of the Bugpack project. Written on TypeScript with Express and MongoDB.

### Prerequisites
[*Node.js@^13.3.0 with npm@^6.13.1*](https://nodejs.org/en/download/) and [*MongoDB@^4.2.2*](https://www.mongodb.com/download-center/community)  
**OR**  
[*Docker@^19.03.5*](https://www.docker.com/)

The project requires the following environment variables to be present. Create a `.env` file at the root of the project.  
The example values should be sufficient to get the application up and running.

| Environment Variable  | Example Value       | Description                                           |
| --------------------- | ------------------- | ----------------------------------------------------- |
| `PORT`                | `3001`              | the port that the server will be running on           |
| `DB_IP`               | `mongodb://0.0.0.0` | the mongodb ip that is used when running with npm     |
| `DB_CONTAINER_IP`     | `mongodb://mongo`   | the mongodb ip that is used when running from docker  |
| `DB_PORT`             | `27017`             | the mongodb port                                      |
| `DB_NAME`             | `bugpack-api`       | the name of the database                              |
| `JWT_SECRET`          | `almond-milk`       | the secret that will be used to create JWT            |

### Running the application

Make sure the `PORT` that you're running from is available.

#### With NPM
1. `npm install`
2. `npm run dev` **OR** `npm run build && npm start`

#### With Docker
1. `docker-compose up --build -d`
