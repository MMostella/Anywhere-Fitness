const router = require("express").Router();

const Classes = require("../classes/classes-model");

router.get("/", (req, res, next) => {
  Classes.getAll()
    .then((classes) => {
      res.json(classes);
    })
    .catch(next);
});

router.get("/:class_id", (req, res, next) => {
  Classes.getClassList(req.params.class_id)
    .then((classes) => {
      res.json(classes);
    })
    .catch(next);
});

router.post("/", (req, res, next) => {
  let newClass = req.body;

  Classes.add(newClass)
    .then((saved) => {
      res.status(201).json(saved);
    })
    .catch(next);
});

router.post("/register", async (req, res, next) => {
  try {
    const updated = await Classes.registerClass(req.body);
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

router.put("/:class_id", async (req, res, next) => {
  try {
    const updated = await Classes.updateById(req.params.class_id, req.body);
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

router.delete("/user/:user_id", async (req, res, next) => {
  try {
    await Classes.deleteClient(req.params.user_id);
    res.json({ message: `User deleted from class` });
  } catch (err) {
    next(err);
  }
});

router.delete("/:class_id", async (req, res, next) => {
  try {
    await Classes.deleteById(req.params.id);
    res.json({ message: `Class deleted` });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
