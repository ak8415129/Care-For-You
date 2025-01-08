import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { upvoteWardReview, fetchWardReview } from "../../Actions/ReviewActions";
import Likes from "./Likes";
import { useNavigate } from "react-router-dom";

const FilledRating = ({ filled }) => {
  let htmlElement = [];
  for (let i = 0; i < filled; i++) {
    htmlElement.push(
      <span key={i} className="text-yellow-500">
        &#9733;
      </span>
    );
  }
  return htmlElement;
};

const UnfilledRating = ({ notFilled }) => {
  let htmlElement = [];
  for (let i = 0; i < notFilled; i++) {
    htmlElement.push(
      <span key={5 - i} className="text-yellow-500">
        &#9734;
      </span>
    );
  }
  return htmlElement;
};

const category = ["All", "Positive", "Negative"];
const Reviews = ({ ward, wardId }) => {
  const [currentWardReviews, setCurrentWardReviews] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("profile"));

  const allReviews = useSelector((state) => state.reviews);

  useEffect(() => {
    dispatch(fetchWardReview());
  }, [navigate, dispatch]);

  useEffect(() => {
    let categoryReview;
    const wardReviews = allReviews.filter((review) => review.wardId === wardId);
    if (selectedCategory === "Positive" || selectedCategory === "Negative") {
      categoryReview = wardReviews.filter(
        (r) => r.sentiment.toLowerCase() === selectedCategory.toLowerCase()
      );
    } else {
      categoryReview = wardReviews;
    }
    setCurrentWardReviews(categoryReview);
  }, [selectedCategory, allReviews, ward]);

  const likeHandler = (id) => {
    dispatch(upvoteWardReview(id));
  };

  const onCategoryClickHandler = (cat) => {
    setSelectedCategory(cat);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 md:p-8 lg:p-12 max-w-4xl mx-auto">
      <p className="text-center text-3xl font-semibold">{ward}</p>;
      <h1 className="text-3xl mb-6 md:mb-8 lg:mb-12">User Reviews</h1>
      <div className="flex mb-5">
        {category.map((cat) => (
          <Button
            key={cat}
            className={selectedCategory === cat ? "selected" : ""}
            style={{
              backgroundColor:
                selectedCategory === cat ? "rgb(71 25 165)" : "#6b36d6",
              color: "white",
              fontWeight: "bold",
              marginLeft: "10px",
            }}
            onClick={() => onCategoryClickHandler(cat)}
          >
            {cat}
          </Button>
        ))}
      </div>
      {currentWardReviews.length === 0 ? (
        <p className="text-lg font-bold mb-2 text-gray-900">No reviews yet.</p>
      ) : (
        currentWardReviews.map((review) => (
          <div
            key={review?._id}
            className="border-b border-gray-200 mb-6 md:mb-8 lg:mb-12 pb-6 md:pb-8 lg:pb-12 relative"
          >
            <p className="text-lg font-bold mb-2 text-gray-900">
              {review?.review}
            </p>
            <p className="text-gray-500 absolute bottom-0 right-0 text-sm">
              {review?.name}
            </p>
            <div className="mt-2">
              <FilledRating filled={review?.rating} />
              <UnfilledRating notFilled={5 - review?.rating} />
            </div>
            <Button
              size="small"
              color="primary"
              disabled={!user?.result}
              onClick={() => likeHandler(review?._id)}
            >
              <Likes review={review} />
            </Button>
          </div>
        ))
      )}
    </div>
  );
};

export default Reviews;
