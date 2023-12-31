import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Rating = () => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();


  const handleRatingChange = (event) => {
    setRating(parseInt(event.target.value));
  };

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const submitRatingAndReview = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(`https://moengage-server.onrender.com/home/brewery/${id}/rating`, {
        breweryId: id,
        rating,
        review,
      });
  
      // Assuming the server sends back data
      const responseData = response.data;
  
      // Retrieve existing brewery data from local storage
      const existingBreweryData = JSON.parse(localStorage.getItem('breweryData')) || {};
  
      // Update or add the new rating and review for the current brewery ID
      existingBreweryData[id] = {
        rating: responseData.rating,
        review: responseData.review,
      };
  
      // Save the updated breweryData object to local storage
      localStorage.setItem('breweryData', JSON.stringify(existingBreweryData));
  
      navigate(`/home/brewery/${id}`);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  

  return (
    <div className="max-w-md p-4 mx-auto mt-20 bg-blue-50 rounded-lg shadow-lg">
      <h2 className="mb-4 text-2xl font-bold text-blue-800">Rate and Review</h2>
      <div className="mb-4">
        <label htmlFor="rating" className="block mb-1 text-sm font-medium text-blue-800">
          Rating (1-5):
        </label>
        <input
          type="number"
          id="rating"
          name="rating"
          min="1"
          max="5"
          value={rating}
          onChange={handleRatingChange}
          className="w-full px-4 py-2 border border-blue-400 rounded"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="review" className="block mb-1 text-sm font-medium text-blue-800">
          Review:
        </label>
        <textarea
          id="review"
          name="review"
          value={review}
          onChange={handleReviewChange}
          className="w-full px-4 py-2 border border-blue-400 rounded"
          rows="4"
        ></textarea>
      </div>
      <button
        onClick={submitRatingAndReview}
        className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
      >
        Submit Rating & Review
      </button>
    </div>
  );
};

export default Rating;