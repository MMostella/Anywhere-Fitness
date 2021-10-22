const router = require("express").Router();

const Classes = require("../classes/classes-model");
const restricted = require("../middleware/restricted");
const { only } = require("../middleware/auth-middleware");
const { checksRegisteration } = require("../middleware/class-middleware");

const INSTRUCTOR_ROLE_ID = 1;

router.get("/", restricted, (req, res, next) => {
  Classes.getAll()
    .then((classes) => {
      res.json(classes);
    })
    .catch(next);
});

router.get(
  "/:class_id",
  restricted,
  only(INSTRUCTOR_ROLE_ID),
  (req, res, next) => {
    Classes.getClassList(req.params.class_id)
      .then((classes) => {
        res.json(classes);
      })
      .catch(next);
  }
);

router.post("/", restricted, only(INSTRUCTOR_ROLE_ID), (req, res, next) => {
  let newClass = req.body;

  Classes.add(newClass)
    .then((saved) => {
      res.status(201).json(saved);
    })
    .catch(next);
});

router.post(
  "/register",
  restricted,
  checksRegisteration,
  async (req, res, next) => {
    try {
      await Classes.registerClass(req.body);
      res.json({ message: `You have been added to the class!` });
    } catch (err) {
      next(err);
    }
  }
);

router.put(
  "/:class_id",
  restricted,
  only(INSTRUCTOR_ROLE_ID),
  async (req, res, next) => {
    try {
      const updated = await Classes.updateById(req.params.class_id, req.body);
      res.json(updated);
    } catch (err) {
      next(err);
    }
  }
);

router.delete("/:user_id/:class_id", restricted, async (req, res, next) => {
  try {
    const { class_id, user_id } = req.params;
    await Classes.deleteClient(class_id, user_id);
    res.json({ message: `User deleted from class` });
  } catch (err) {
    next(err);
  }
});

router.delete(
  "/:class_id",
  restricted,
  only(INSTRUCTOR_ROLE_ID),
  async (req, res, next) => {
    try {
      await Classes.deleteById(req.params.class_id);
      res.json({ message: `Class deleted` });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
