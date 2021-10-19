const Users = require("../users/users-model");

async function checkUsernameFree(req, res, next) {
  try {
    const users = await Users.findBy({ username: req.body.username });
    if (!users.length) {
      next();
    } else {
      next({ status: 422, message: "Username taken" });
    }
  } catch (err) {
    next(err);
  }
}

function checkForUserInput(req, res, next) {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      next({ message: "username and password required" });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
}

async function checkUsernameExists(req, res, next) {
  try {
    const users = await Users.findBy({ username: req.body.username });
    if (users.length) {
      req.user = users[0];
      next();
    } else {
      next({ status: 401, message: "Invalid credentials" });
    }
  } catch (err) {
    next(err);
  }
}

module.exports = {
  checkForUserInput,
  checkUsernameExists,
  checkUsernameFree,
};
