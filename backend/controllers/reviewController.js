const Review = require("../models/reviewModel");
const Ward = require("../models/wardModel");
const mongoose = require("mongoose");
const getReview = async (req, res) => {
  try {
    const allReviews = await Review.find();
    res.status(200).json(allReviews);
  } catch (error) {
    console.log(error);
  }
};

const postReview = async (req, res) => {
  const { name, review, rating, wardId, sentiment } = req.body;
  try {
    const newReview = await Review.create({
      name,
      review,
      rating,
      wardId,
      sentiment,
    });
    res.status(200).json(newReview);
  } catch (error) {
    console.log(error);
  }
};

const voteReview = async (req, res) => {
  const { id } = req.params;
  console.log("Hello ", id);
  if (!req.userId) return res.json({ message: "Unauthenticated" });
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send("No review with that id");
    }
    const currentReview = await Review.findById(id);
    console.log(currentReview);
    let index = currentReview.votedIds.findIndex(
      (id) => id === String(req.userId)
    );

    // index == -1 means that the user who is logged in liked the review so that user's id will be inserted into the votedIds of the current review
    // when index != -1 means that the user who who is logged already liked the review and want to remove likes from the current review
    if (index === -1) {
      currentReview.votedIds.push(String(req.userId));
    } else {
      currentReview.votedIds = currentReview.votedIds.filter(
        (id) => id !== String(req.userId)
      );
    }
    console.log(currentReview);
    const updatedReview = await Review.findByIdAndUpdate(id, currentReview, {
      new: true,
    });
    res.json(updatedReview);
  } catch (error) {
    console.log(error);
  }
};
module.exports = { getReview, postReview, voteReview };
