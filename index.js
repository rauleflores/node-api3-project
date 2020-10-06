const express = require("express");
const logger = require("./middleware/logger");

const server = express();
const port = 8000;

server.use(express.json());
server.use(logger);

server.listen(port, () => {
  console.log(`Server listening on port ${port}.`);
});
