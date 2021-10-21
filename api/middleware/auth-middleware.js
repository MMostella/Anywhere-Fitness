const Users = require("../users/users-model");

const only = (role_id) => (req, res, next) => {
  if (req.decodedToken.role_id === role_id) {
    next();
  } else {
    next({ status: 403, message: `This is not for you` });
  }
};

async function checkUsernameFree(req, res, next) {
  try {
    const user = await Users.findBy({ username: req.body.username });
    if (!user.length) {
      next();
    } else {
      next({ status: 422, message: "Username taken" });
    }
  } catch (err) {
    next({ message: `Username is Required` });
  }
}

function checkRoleId(req, res, next) {
  try {
    const { role_id } = req.body;
    if (!role_id) {
      next({ message: `Role ID is required` });
    } else {
      next();
    }
  } catch (err) {
    next(err);
  }
}

function checkForUserInput(req, res, next) {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      next({ message: "Username and Password are required" });
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
  only,
  checkRoleId,
};
