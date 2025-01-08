const express = require("express");
const router = express.Router();
const {
  postReview,
  getReview,
  voteReview,
} = require("../controllers/reviewController");
const auth = require("../middlewares/auth");

router.post("/", auth, postReview);
router.get("/", auth, getReview);
router.patch("/:id/vote", auth, voteReview); // id is for review for which vote is given

module.exports = router;
