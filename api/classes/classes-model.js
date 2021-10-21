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
  const added = await db("register").insert(client, ["class_id", "user_id"]);
  return added;
}

function getClassList(class_id) {
  return db("register as r")
    .join("users as u", "r.user_id", "u.user_id")
    .select("register_id", "username")
    .where("class_id", class_id);
}

function deleteClient(class_id, user_id) {
  const currentClass = findById(class_id);
  return db("register").where("user_id", user_id).delete;
}

function deleteById(class_id) {
  return db("classes").where("class_id", class_id).delete;
}

module.exports = {
  getAll,
  add,
  findById,
  findBy,
  deleteById,
  updateById,
  registerClass,
  getClassList,
  deleteClient,
};
