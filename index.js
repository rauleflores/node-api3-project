const express = require("express");
const cors = require("cors");
const logger = require("./middleware/logger");
const userRouter = require("./users/userRouter");

const server = express();
const port = process.env.PORT || 8000;

server.use(express.json());
server.use(cors());
server.use(logger);
server.use(userRouter);

server.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    errorMessage: "Something went wrong, please try again later.",
  });
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}.`);
});
