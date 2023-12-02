import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink, useParams } from 'react-router-dom';

const BreweryDetail = () => {
  const [brewery, setBrewery] = useState(null);
  const [reviews, setReviews] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    // Fetch brewery details from the API
    axios
      .get(`https://api.openbrewerydb.org/v1/breweries/${id}`)
      .then((response) => {
        setBrewery(response.data);
      })
      .catch((error) => {
        console.error('Error fetching brewery data:', error);
      });
  
    // Retrieve rating and review from local storage based on breweryId
    const breweryData = JSON.parse(localStorage.getItem('breweryData')) || {};
    if (breweryData[id]) {
      setReviews([{ rating: breweryData[id].rating, review: breweryData[id].review }]);
    }
  }, [id]);
  

  if (!brewery) {
    return <div className="mt-8 text-2xl text-center text-yellow-700">Loading...</div>;
  }


  return (
    <div className="max-w-md p-4 mx-auto mt-20 bg-blue-50 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <NavLink to="/home" className="w-1/2">
          <button className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-600 w-full">
            Go back
          </button>
        </NavLink>
        <NavLink to={`/home/brewery/${id}/rating`} className="w-1/2 ml-2">
          <button className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-600 w-full">
            Rate
          </button>
        </NavLink>
      </div>

      <h2 className="mb-4 text-3xl font-bold text-black-800">{brewery.name}</h2>
      <p className="mb-2 text-lg text-black-800">Address: {brewery.street}, {brewery.city}, {brewery.state} {brewery.postal_code}</p>
      <p className="mb-2 text-lg text-black-800">Phone: {brewery.phone}</p>
      <p className="mb-4 text-lg text-black-800">Website: <a href={brewery.website_url} className="text-blue-600">{brewery.website_url}</a></p>

      <div className="mb-4 text-blue-900">
        <h3 className="mb-2 text-2xl font-bold">Reviews and Ratings:</h3>
        {reviews.map((review, index) => (
          <div key={index} className="pb-4 mb-4 border-b-2 border-blue-400">
            <p className="mb-2 text-lg">Rating: {review.rating}</p>
            <p className="mb-2 text-lg">Review: {review.review}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BreweryDetail;