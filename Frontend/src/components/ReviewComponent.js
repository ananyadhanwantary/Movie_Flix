import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';  // Importing Font Awesome stars
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import '../styles/ReviewComponent.css';

const ReviewComponent = ({ movieId, userId }) => {
  const [rating, setRating] = useState(null);  // Rating out of 5
  const [hover, setHover] = useState(null);    // Hover state for star highlight
  const [reviewText, setReviewText] = useState(''); // Written review

  const submitReview = async () => {
    if (rating && reviewText) {
      try {
         console.log({
            userId,
            rating,
            review: reviewText,
          });
        await axios.put(`http://localhost:3001/api/movie/review/${movieId}`, {
          userId,
          rating,
          review: reviewText,
        });
        alert('Review submitted successfully!');
        setRating(null); 
        setReviewText(''); 
      } catch (error) {
        console.log('Error submitting review:', error);
      }
    } else {
      alert('Please provide both a rating and a written review.');
    }
  };

  return (
    <div className="review-container">
      <h3>Rate this Movie</h3>

      {/* Star Rating */}
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
                // Hidden radio button
                className="radio-input"
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

      {/* Written Review */}
      <Form.Group controlId="reviewText" className="mt-4">
        <Form.Label>Write a Review</Form.Label>
        <Form.Control
          as="textarea"
          rows={4}
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Share your thoughts about this movie..."
        />
      </Form.Group>

      {/* Submit Button */}
      <Button className="mt-3" variant="primary" onClick={submitReview}>
        Submit Review
      </Button>
    </div>
  );
};

export default ReviewComponent;
