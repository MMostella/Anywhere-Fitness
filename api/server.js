const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const usersRouter = require("./users/users-router");
const classesRouter = require("./classes/classes-router");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/api/users", usersRouter);
server.use("/api/classes", classesRouter);

server.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
  });
});

module.exports = server;
