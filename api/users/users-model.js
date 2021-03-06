const db = require("../data/db-config");

module.exports = {
  getAll,
  add,
  findById,
  findBy,
  getUsersClasses,
};

function getAll() {
  return db("users as u")
    .join("roles as r", "u.role_id", "r.role_id")
    .select("u.user_id", "u.username", "r.role_name");
}

async function add(user) {
  const newUser = await db("users").insert(user, [
    "user_id",
    "username",
    "role_id",
  ]);
  return newUser;
}

function findById(id) {
  return db("users").where("user_id", id).first();
}

function findBy(filter) {
  return db("users").where(filter);
}

async function getUsersClasses(user_id) {
  const classes = await db("register as r")
    .join("classes as c", "c.class_id", "r.class_id")
    .where("r.user_id", user_id)
    .select(
      "c.class_name",
      "c.start_time",
      "c.duration",
      "c.intensity_level",
      "c.location"
    );
  return classes;
}
