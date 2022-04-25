import React from "react";
import ReactStars from "react-rating-stars-component";
import PropTypes from "prop-types";

export default function Rating({ onStartClick, value }) {
  const ratingChanged = (newRating) => {
    console.log("newRating", newRating);
    onStartClick(newRating);
  };

  return (
    <ReactStars
      count={5}
      onChange={ratingChanged}
      size={24}
      activeColor="#ffd700"
      value={value}
    />
  );
}

Rating.propTypes = {
  onStartClick: PropTypes.func,
  value: PropTypes.number,
};

Rating.defaultProps = {
  onStartClick: () => {},
  value: 0,
};
