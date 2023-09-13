const config = require("./app/config");
const conexaoMongodb = require("./app/loaders/mongodbLoader");
const databaseLoader = require("./app/loaders/databaseLoader");

async function startServer() {
  // Conexão com o MariaDB
  process.connection = {};
  process.connection.mariaDB = await databaseLoader.conectar();

  // Conexão com o MongoDB
  await conexaoMongodb.conectar();

  const app = require("./app");

  app.listen(config.port, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(`Server is listening on port ${app.get("port")}...`);
  });
}

startServer();
