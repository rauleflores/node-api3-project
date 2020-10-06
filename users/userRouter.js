const express = require("express");
const udb = require("./userDb");

const router = express.Router();

router.post("/", (req, res) => {});

router.post("/:id/posts", (req, res) => {});

router.get("/", (req, res) => {
  udb
    .get()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      next(error);
    });
});

router.get("/:id", validateUserId, (req, res) => {
  res.status(200).json(req.user);
});

router.get("/:id/posts", validateUserId, (req, res) => {
  udb
    .getUserPosts(req.user.id)
    .then((posts) => {
      if (!posts) {
        res.status(400).json({
          errorMessage: "Posts information not found.",
        });
      } else {
        res.status(200).json(posts);
      }
    })
    .catch((error) => next(error));
});

router.delete("/:id", validateUserId, (req, res) => {});

router.put("/:id", validateUserId, (req, res) => {});

//custom middleware

function validateUserId(req, res, next) {
  udb
    .getById(req.params.id)
    .then((user) => {
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(400).json({
          errorMessage: "Invalid user ID.",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        errorMessage: "The user ID could not be validated, try again later.",
      });
    });
}

function validateUser(req, res, next) {
  if (!req.body) {
    res.status(400).json({
      errorMessage: "Missing user data",
    });
  } else if (!req.body.name) {
    res.status(400).json({
      errorMessage: "Missing required name field.",
    });
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  if (!req.body) {
    res.status(400).json({
      errorMessage: "Missing post data",
    });
  } else if (!req.body.text) {
    res.status(400).json({
      errorMessage: "Missing required text field.",
    });
  } else {
    next();
  }
}

module.exports = router;
