const express = require("express");
const udb = require("./userDb");

const router = express.Router();

router.post("/", (req, res) => {
  res.status(200).json({
    message: "Hello, World!",
  });
});

router.post("/:id/posts", (req, res) => {
  // do your magic!
});

router.get("/users", (req, res) => {
  udb
    .get()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        errorMessage: "The user information could not be retrieved.",
      });
    });
});

router.get("/:id", (req, res) => {
  // do your magic!
});

router.get("/:id/posts", (req, res) => {
  // do your magic!
});

router.delete("/:id", (req, res) => {
  // do your magic!
});

router.put("/:id", (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
