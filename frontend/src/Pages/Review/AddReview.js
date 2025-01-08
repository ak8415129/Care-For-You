import { Button, TextField, MenuItem } from "@material-ui/core";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postWardReview } from "../../Actions/ReviewActions";
import { useNavigate } from "react-router-dom";
import Sentiment from "sentiment";
import Hospital from "./hospital.jpg";
const sentiment = new Sentiment();

const AddReview = ({ ward, wardId }) => {
  const [userReview, setUserReview] = useState({
    name: "",
    review: "",
    rating: 1,
    sentiment: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitReviewFormHandler = (e) => {
    e.preventDefault();
    const result = sentiment.analyze(userReview.review);
    console.log(result);
    let review;
    if (result.score < 0) {
      review = { ...userReview, wardId, sentiment: "negative" };
    } else if (result.score >= 0) {
      review = { ...userReview, wardId, sentiment: "positive" };
    }
    console.log(review);
    dispatch(postWardReview(review));
    navigate("/");
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${Hospital})` }}
    >
      <form
        className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg px-8 py-6 w-full"
        onSubmit={onSubmitReviewFormHandler}
      >
        <h2 className="text-2xl text-center font-semibold mb-4">
          {ward} Review Form
        </h2>
        <div className="mb-4">
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            onChange={(e) => {
              setUserReview({ ...userReview, name: e.target.value });
            }}
            required
          />
        </div>
        <div className="mb-4">
          <TextField
            label="Review"
            variant="outlined"
            fullWidth
            onChange={(e) => {
              setUserReview({ ...userReview, review: e.target.value });
            }}
            required
          />
        </div>
        <div className="mb-4">
          <TextField
            label="Rating (1-5)"
            variant="outlined"
            select
            value={userReview.rating}
            onChange={(e) => {
              setUserReview({ ...userReview, rating: e.target.value });
            }}
            fullWidth
            required
          >
            {[1, 2, 3, 4, 5].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div className="flex justify-center">
          <Button
            variant="contained"
            color="secondary"
            size="small"
            type="submit"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddReview;
