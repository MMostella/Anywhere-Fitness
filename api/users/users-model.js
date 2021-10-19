const db = require("../data/db-config");

module.exports = {
  getAll,
  add,
  findById,
  findBy,
};

function getAll() {
  return db("users");
}

async function add(user) {
  const [{ user_id }] = await db("users").insert(user, ["user_id"]);
  console.log(`this is id`, user_id);
  return findById(user_id);
}

function findById(id) {
  return db("users").where("user_id", id).first();
}

function findBy(filter) {
  return db("users").where(filter);
}
