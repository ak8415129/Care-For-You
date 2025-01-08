import React from "react";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";

const Likes = ({ review }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  if (review?.votedIds?.length > 0) {
    return review?.votedIds?.find(
      (like) => like === (user?.result?.googleId || user?.result?._id)
    ) ? (
      <>
        <ThumbUpAltIcon fontSize="small" />
        &nbsp;
        {review?.votedIds?.length > 2
          ? `You and ${review?.votedIds?.length - 1} others`
          : `${review?.votedIds?.length} like${
              review?.votedIds?.length > 1 ? "s" : ""
            }`}
      </>
    ) : (
      <>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;{review?.votedIds?.length}{" "}
        {review?.votedIds?.length === 1 ? "Like" : "Likes"}
      </>
    );
  }

  return (
    <>
      <ThumbUpAltOutlined fontSize="small" />
      &nbsp;Like
    </>
  );
};

export default Likes;
