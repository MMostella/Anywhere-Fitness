const Classes = require("../classes/classes-model");

function checkClassSize(req, res, next) {
  try {
    const test = Classes.findById(req.params.class_id);
    const size = Classes.getClassList(req.params.class_id);
    if (size.length < test.max_class_size) {
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
