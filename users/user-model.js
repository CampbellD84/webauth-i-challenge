const db = require("../data/db-config");

module.exports = {
  addUser,
  findUser,
  findUserById,
  findUserBy
};

function findUser() {
  return db("users").select("id", "username", "password");
}

function findUserById(id) {
  return db("users")
    .where({ id })
    .first();
}

function findUserBy(criteria) {
  return db("users").where(criteria);
}

function addUser(user) {
  return db("users")
    .insert(user, "id")
    .then(ids => {
      const [id] = ids;
      return findUserById(id);
    });
}
