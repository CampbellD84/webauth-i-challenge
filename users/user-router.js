const express = require("express");
// const bcrypt = require("bcryptjs");

const Users = require("../users/user-model");

const restricted = require("../auth/middleware-restricted");

const router = express.Router();

router.get("/", restricted, (req, res) => {
  Users.findUser()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.send(err);
    });
});

// router.post("/login", async (req, res) => {
//   let { username } = req.headers;

//   const loggedIn = await Users.findUserBy({ username }).first();
//   try {
//     if (loggedIn) {
//       res.status(200).json({ message: `Welcome ${loggedIn.username}!` });
//     } else {
//       res.status(401).json({ message: "Invalid Credentials." });
//     }
//   } catch ({ err }) {
//     res.status(500).json({ err, message: "Unknown error." });
//   }
// });

// router.post("/register", async (req, res) => {
//   let user = req.body;

//   const hash = bcrypt.hashSync(user.password, 10);

//   user.password = hash;

//   const newUser = await Users.addUser(user);

//   try {
//     res.status(201).json(newUser);
//   } catch ({ err }) {
//     res.status(500).json({ err, message: "Could not add user." });
//   }
// });

// function validateUserLoggedIn(req, res, next) {
//   const { username, password } = req.headers;
//   if (username && password) {
//     Users.findUserBy({ username })
//       .first()
//       .then(user => {
//         if (user && bcrypt.compareSync(password, user.password)) {
//           next();
//         } else {
//           res.status(403).json({ message: "Invalid Credentials." });
//         }
//       })
//       .catch(err => {
//         res.status(500).json({ message: "Unknown Error." });
//       });
//   } else {
//     res.status(400).json({
//       message: "No credentials were provided. Try again with credentials."
//     });
//   }
// }

module.exports = router;
