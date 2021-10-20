const db = require("../data/db-config");

function getAll() {
  return db("classes");
}

async function add(newClass) {
  const [{ class_id }] = await db("classes").insert(newClass, ["class_id"]);
  return findById(class_id);
}

function findById(id) {
  return db("classes").where("class_id", id).first();
}

function findBy(filter) {
  return db("classes").where(filter);
}

async function updateById(class_id, updatedClass) {
  await db("classes").where("class_id", class_id).update(updatedClass);
  return findById(class_id);
}

async function registerClass(client) {
  const [{ class_id, user_id }] = await db("register").insert(client);
  return class_id;
}

async function deleteById(id) {
  return db("classes").where("class_id", id).delete;
}

module.exports = {
  getAll,
  add,
  findById,
  findBy,
  deleteById,
  updateById,
  registerClass,
};
