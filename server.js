const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const userRouter = require("./users/user-router");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/api", userRouter);

module.exports = server;
