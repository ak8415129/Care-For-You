import { FETCH_REVIEW, POST_REVIEW, UPVOTE_REVIEW } from "../Types/ActionTypes";

// eslint-disable-next-line import/no-anonymous-default-export
export default (reviews = [], action) => {
  switch (action.type) {
    case FETCH_REVIEW:
      return action.payload;
    case POST_REVIEW:
      return [...reviews, action.payload];
    case UPVOTE_REVIEW:
      return reviews.map((review) =>
        review._id === action.payload._id ? action.payload : review
      );
    default:
      return reviews;
  }
};
