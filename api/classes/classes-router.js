const router = require("express").Router();

// const {  } = require("../middleware/auth-middleware");

const Classes = require("../classes/classes-model");

router.get("/", (req, res, next) => {
  Classes.getAll()
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

router.post("/register/:class_id", async (req, res, next) => {
  try {
    const { user_id } = req.body;
    const updated = await Classes.registerClass(req.params.class_id, user_id);

    // if (updated.class_size < updated.max_class_size) {
    //   res.json({
    //     ...updated,
    //     class_size: updated.class_size + 1,
    //   });
    // } else {
    //   next({ message: `This class is full` });
    // }
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

router.delete("/:class_id", async (req, res, next) => {
  try {
    await Classes.deleteById(req.params.id);
    res.json({ message: `Class deleted` });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
