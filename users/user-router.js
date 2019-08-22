const express = require("express");
const bcrypt = require("bcryptjs");

const Users = require("../users/user-model");

const router = express.Router();

router.get("/users", async (req, res) => {
  const users = await Users.findUser();

  try {
    res.json(users);
  } catch ({ err }) {
    res.status(500).json({ err, message: "Could not retrieve users." });
  }
});

router.post("/login", async (req, res) => {
  let { username } = req.headers;

  const loggedIn = await Users.findUserBy({ username }).first();
  try {
    if (loggedIn) {
      res.status(200).json({ message: `Welcome ${loggedIn.username}!` });
    } else {
      res.status(401).json({ message: "Invalid Credentials." });
    }
  } catch ({ err }) {
    res.status(500).json({ err, message: "Unknown error." });
  }
});

router.post("/register", async (req, res) => {
  let user = req.body;

  const hash = bcrypt.hashSync(user.password, 10);

  user.password = hash;

  const newUser = await Users.addUser(user);

  try {
    res.status(201).json(newUser);
  } catch ({ err }) {
    res.status(500).json({ err, message: "Could not add user." });
  }
});

module.exports = router;
