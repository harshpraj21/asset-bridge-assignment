import axios from "axios";
import { useState } from "react";
import { API } from "../../../utils/api";
import { useAuthToken } from "../../../utils/useAuthToken";

const ReviewModal = ({ isOpen, onClose, book, onSuccess }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const token = useAuthToken();

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        API.reviews,
        {
          book,
          rating,
          comment,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (onSuccess) {
        onSuccess(res.data);
      }
    } catch (err) {
      console.error("Error submitting review:", err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center  backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg shadow w-full max-w-2xl">
        <h2 className="text-xl font-semibold mb-4">Add Review</h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <input
            type="number"
            min={1}
            max={5}
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="w-full border rounded p-2"
            required
          />
          <textarea
            placeholder="Write your comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full border rounded p-2"
            required
          />
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewModal;
