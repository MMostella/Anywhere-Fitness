const Classes = require("../classes/classes-model");

function checkClassSize(req, res, next) {
  try {
    const test = Classes.findById(req.params.class_id);
    const size = Classes.getClassList(req.params.class_id);
    if (test.max_class_size > size.length) {
      next();
    } else {
      next({ message: `Class is already full!` });
    }
  } catch (err) {
    next(err);
  }
}

module.exports = {
  checkClassSize,
};
