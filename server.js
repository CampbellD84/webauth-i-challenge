const session = require("express-session");
const knexSessionStore = require("connect-session-knex")(session);
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const usersRouter = require("./users/user-router");
const authRouter = require("./auth/auth-router");

const sessionOptions = {
  name: "acookie",
  secret: "wynonabigbadbeaver",
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: false,
    httpOnly: true
  },
  resave: false,
  saveUninitialized: false,

  store: new knexSessionStore({
    knex: require("./data/db-config"),
    tablename: "sessions",
    sidfieldname: "sid",
    createtable: true,
    clearInterval: 1000 * 60 * 60
  })
};

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use(session(sessionOptions));

server.use("/api/auth", authRouter);
server.use("/api/users", usersRouter);

module.exports = server;
