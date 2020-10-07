const express = require("express");
const { update } = require("../data/dbConfig");
const udb = require("./userDb");
const pdb = require("../posts/postDb");

const router = express.Router();

router.post("/", validateUser, (req, res) => {
  udb
    .insert(req.body)
    .then((newUser) => {
      res.status(201).json(newUser);
    })
    .catch((error) => next(error));
});

router.post("/:id/posts", validateUserId, validatePost, (req, res) => {
  const newPost = {
    text: req.body.text,
    user_id: req.params.id,
  };
  pdb
    .insert(newPost)
    .then((post) => {
      res.status(201).json(post);
    })
    .catch((error) => console.log(error));
});

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

router.delete("/:id", validateUserId, (req, res) => {
  udb
    .remove(req.params.id)
    .then((num) => {
      res.status(300).json(num);
    })
    .catch((error) => next(error));
});

router.put("/:id", validateUserId, validateUser, (req, res) => {
  udb
    .update(req.params.id, req.body)
    .then((updates) => {
      res.status(300).json(updates);
    })
    .catch((error) => next(error));
});

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
  if (Object.values(req.body).length === 0) {
    return res.status(400).json({
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
  if (Object.values(req.body).length === 0) {
    return res.status(400).json({
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
