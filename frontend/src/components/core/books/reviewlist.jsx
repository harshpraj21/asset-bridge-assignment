import { ChevronLeft, ChevronRight } from "lucide-react";
import { API } from "../../../utils/api";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ReviewList = () => {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [prevPageUrl, setPrevPageUrl] = useState(null);
  const [currentUrl, setCurrentUrl] = useState(`${API.reviews}?book=${id}`);

  const fetchReviews = useCallback(async (url) => {
    try {
      const res = await axios.get(url);
      setReviews(res.data.results);
      setNextPageUrl(res.data.next);
      setPrevPageUrl(res.data.previous);
    } catch (err) {
      console.error("Failed to fetch books:", err);
    }
  }, []);

  useEffect(() => {
    fetchReviews(currentUrl);
  }, [currentUrl, fetchReviews]);

  const handleNext = () => {
    if (nextPageUrl) setCurrentUrl(nextPageUrl);
  };

  const handlePrev = () => {
    if (prevPageUrl) setCurrentUrl(prevPageUrl);
  };

  return (
    <div className="bg-white shadow rounded-lg p-5">
      <ReviewListHeader
        handleNext={handleNext}
        handlePrev={handlePrev}
        prevPageUrl={prevPageUrl}
        nextPageUrl={nextPageUrl}
      />
      {reviews && reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review.id} className="border-t py-4">
            <p className="text-sm text-gray-500">
              {new Date(review.timestamp).toLocaleString()}
            </p>
            <p className="text-yellow-700 font-semibold">
              ⭐ {review.rating} / 5
            </p>
            <p className="text-gray-800 mt-1">{review.comment}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No reviews yet.</p>
      )}
    </div>
  );
};

export default ReviewList;

const ReviewListHeader = ({
  handlePrev,
  handleNext,
  prevPageUrl,
  nextPageUrl,
}) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-xl font-semibold">Reviews</h2>
      <div className="flex items-center gap-2">
        <button
          className="p-2 rounded hover:bg-gray-100"
          onClick={handlePrev}
          disabled={!prevPageUrl}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          className="p-2 rounded hover:bg-gray-100"
          onClick={handleNext}
          disabled={!nextPageUrl}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
