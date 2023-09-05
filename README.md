# LikeLine - Personal Learning Project

## Description
LikeLine is an engaging and interactive Instagram clone designed for personal use to practice and apply best practices in web development. It is structured as a monorepo using npm workspaces, with dedicated folders for both the backend and frontend components. This comprehensive README will guide you on setting up and running the project on your local machine.

## Prerequisites
Before running the project, ensure that you have the following installed:

- Node.js (v14 or later)
- npm (v7 or later)
- MongoDB (v4 or later)
- Docker
- Docker Compose

## Getting Started
1. Clone the repository to your local machine:
```bash
git clone https://github.com/pmartinsdev/likeline.git
cd likeline
```

2. Create a `.env` file in the `packages/backend` <!-- and `packages/frontend` --> folders with the following variables:

**packages/backend/.env**
```
# Server Configuration
PORT=3332
JWT_SECRET=super_secret_hash

# PostgreSQL Configuration
PG_DB_USERNAME=your_postgres_username
PG_DB_PASSWORD=your_postgres_password
PG_DB_NAME=your_postgres_database_name
PG_DB_HOST=localhost
PG_DB_PORT=5432

# MongoDB Configuration
MONGO_DB_USERNAME=your_mongo_username
MONGO_DB_PASSWORD=your_mongo_password
MONGO_DB_NAME=your_mongo_database_name
MONGO_DB_HOST=localhost
MONGO_DB_PORT=27017
```

<!-- **packages/frontend/.env** -->
<!-- ``` -->
<!-- PORT=3000 -->
<!-- API_URL=http://localhost:5000/api -->
<!-- ``` -->

<!-- ## Starting the Project -->
<!-- To start the entire project (backend and frontend together), run the following command: -->
<!-- ```bash -->
<!-- npm run start:project -->
<!-- ``` -->

<!-- To start only the frontend, run: -->
<!-- ```bash -->
<!-- npm run start:frontend -->
<!-- ``` -->

To start only the backend, run:
```bash
npm run start:backend
```

The backend server will run on `http://localhost:3333`<!-- , and the frontend server will run on `http://localhost:3000`. -->

## Docker and Docker Compose
LikeLine uses Docker and Docker Compose to provide a seamless setup. Docker Compose manages containers for both the backend and frontend, ensuring a smooth integration.

## New Folder Structure
The updated project structure is as follows:

```
likeline/
  |- packages/
  |    |- backend/
  |    |    |- src/
  |    |    |- package.json
  |    |    |- ...
  |    |
  |    |- frontend/
  |    |    |- public/
  |    |    |- src/
  |    |    |- package.json
  |    |    |- ...
  |
  |- package.json
  |- ...
```

The `packages/backend` folder contains the backend server code<!-- , and the `packages/frontend` folder contains the frontend React application. -->

## Contributing
As this is a personal learning project, contributions are not expected. However, you are welcome to explore, experiment, and make changes to enhance your learning experience.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments
- LikeLine was inspired by Instagram.
- Special thanks to all the open-source projects that have contributed to the learning journey.

## Contact
If you have any questions or feedback, please feel free to contact the project maintainers at contact@paulomartins.dev

Happy learning and coding! 🌐🚀
