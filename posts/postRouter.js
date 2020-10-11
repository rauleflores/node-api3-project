const express = require("express");
const pdb = require("./postDb");

const router = express.Router();

router.get("/", (req, res) => {
  pdb
    .get()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => next(error));
});

router.get("/:id", (req, res) => {
  // do your magic!
});

router.delete("/:id", (req, res) => {
  // do your magic!
});

router.put("/:id", (req, res) => {
  // do your magic!
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
}

module.exports = router;
