import React, { useEffect, useState } from 'react';
import { FaStar, FaUserCircle } from "react-icons/fa"; // Import FontAwesome user icon  // Import Font Awesome stars
import axios from 'axios';  // For API requests
import '../styles/ReviewComponent.css';  // CSS for stars and layout

const ReviewComponent = ({ movieId, userId }) => {
  const [rating, setRating] = useState(null);  // Current user's rating (out of 5)
  const [hover, setHover] = useState(null);    // Hover state for star highlight
  const [review, setReview] = useState('');    // Current user's review text
  const [reviews, setReviews] = useState([]);  // Array of reviews from other users

  // Fetch reviews from other users when the component mounts
  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/movie/reviews/${movieId}`)
      .then((res) => setReviews(res.data)) // Assuming API returns reviews as an array
      .catch((err) => console.log(err));
  }, [review,movieId]);

  // Handle submitting a new review
  const submitReview = () => {
    if (!rating || !review) {
      alert("Please add both a rating and a review");
      return;
    }

    axios
      .put(`http://localhost:3001/api/movie/review/${movieId}`, {
        userId,
        rating,
        review,
      })
      .then((res) => {
        setReviews([...reviews, res.data]); // Add new review to the existing reviews
        setRating(null);  // Reset rating
        setReview('');    // Reset review input
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="review-container">
      {/* Display Reviews */}
      <div className="user-reviews">
        <h3>User Reviews</h3>
        <hr />
        {reviews && reviews.length > 0 ? (
          reviews.map((userReview, index) => (
            <div key={index} className="user-review">
              <FaUserCircle size={50} className="me-3 profile-icon float-start" />
              <div className="user-rating inline-block">
                <strong className='pe-3'>{userReview.reviewedUser} </strong>
                {[...Array(5)].map((star, i) => (
                  <FaStar
                    key={i}
                    color={i < userReview.rating ? "#ffc107" : "#e4e5e9"}
                    size={20}
                  />
                ))}
              </div>
              <p className=''>{userReview.review}</p>
              <hr />
            </div>
          ))
        ) : (
          <p>No reviews yet. Be the first to review!</p>
        )}
      </div>

      {/* Submit Review */}
      <h3>Rate and Review this Movie</h3>
      <div className="star-rating">
        {[...Array(5)].map((star, index) => {
          const currentRating = index + 1;
          return (
            <label key={index}>
              <input
                type="radio"
                name="rating"
                value={currentRating}
                onClick={() => setRating(currentRating)}
                className="radio-input"  // Hidden input for rating
              />
              <FaStar
                className="star"
                color={currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                size={30}
                onMouseEnter={() => setHover(currentRating)}
                onMouseLeave={() => setHover(null)}
              />
            </label>
          );
        })}
      </div>

      <textarea
        className="form-control mt-3"
        rows="3"
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Write your review here..."
      ></textarea>

      <button onClick={submitReview} style={{backgroundColor: "#008000"}} className="border-0 btn btn-primary mt-3">
        Submit Review
      </button>
    </div>
  );
};

export default ReviewComponent;
