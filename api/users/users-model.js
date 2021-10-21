const db = require("../data/db-config");

module.exports = {
  getAll,
  add,
  findById,
  findBy,
  getUsersClasses,
};

function getAll() {
  return db("users");
}

async function add(user) {
  const [{ user_id }] = await db("users").insert(user);
  return findById(user_id);
}

function findById(id) {
  return db("users").where("user_id", id).first();
}

function findBy(filter) {
  return db("users").where(filter);
}

function getUsersClasses(userId) {
  return db("users as u")
    .join("classes as c", "u.role_id", "c.class_id")
    .select("u.user_id", "u.username", "c.class_name")
    .where("u.user_id", userId);
}
