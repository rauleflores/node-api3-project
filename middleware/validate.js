const udb = require("../users/userDb");

function validateUserID() {
  return (req, res, next) => {
    udb
      .getById(req.params.id)
      .then((user) => {
        if (user) {
          req.user = user;
          next();
        } else {
          res.status(404).json({
            errorMessage: "User does not exist.",
          });
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({
          errorMessage: "The user ID could not be validated, try again later.",
        });
      });
  };
}

module.exports = {
  validateUserID,
};
