const Classes = require("../classes/classes-model");

function checkClassSize(req, res, next) {
  try {
    const currentClass = Classes.findById(req.params.class_id);
    const size = Classes.getClassList(req.params.class_id);
    if (size.length < currentClass.max_class_size) {
      next();
    } else {
      next({ message: `Class is already full!` });
    }
  } catch (err) {
    next(err);
  }
}

async function checksRegisteration(req, res, next) {
  try {
    const { class_id, user_id } = req.body;
    const clients = await Classes.getClients(class_id, user_id);
    if (clients.length > 0) {
      next({ message: `You are already registered for this class` });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
}

module.exports = {
  checkClassSize,
  checksRegisteration,
};
