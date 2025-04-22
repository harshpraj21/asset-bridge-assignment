import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import FloatingActionButton from "../../common/FAB";
import ReviewList from "./reviewlist";
import axios from "axios";
import { API } from "../../../utils/api";
import { Trash, Pencil } from "lucide-react";
import { useAuthToken } from "../../../utils/useAuthToken";
import { useSelector } from "react-redux";
import DeleteDialog from "../../common/deleteDialog";
import ReviewModal from "./AddReview";
import Spinner from "../../common/spinner";
import { getBook } from "../../../api/books";

// import { BeatLoader } from "react-spinners";

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const token = useAuthToken();
  const navigate = useNavigate();

  const fetchDetails = async () => {
    setIsLoading(true);
    const res = await getBook(id).catch((err) => {
      console.log(err.response.status);
      if (err.response.status === 404) {
        //TODO: Add Toast
        console.log("something went wrong");
        navigate("/");
      }
    });
    setIsLoading(false);
    setBook(res.data);
  };

  useEffect(() => {
    fetchDetails();
  }, [id]);

  const onBookDelete = async () => {
    try {
      setIsLoading(true);
      const res = await axios.delete(`${API.books}${id}/`, {
        headers: {
          Authorization: token,
        },
      });
      if (res) {
        setIsLoading(false);
      }
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="p-3.5">
          <div className="bg-white shadow rounded-lg w-full p-5 my-3.5">
            <div className="flex justify-between">
              <h1 className="  text-3xl font-bold mb-2">{book.title}</h1>

              {user && book.user && book.user.id === user.id && (
                <div>
                  <button
                    className="p-2 rounded hover:bg-gray-100 cursor-pointer"
                    onClick={() => navigate(`/update-book/${book.id}`)}
                  >
                    <Pencil className="w-5 h-5" />
                  </button>
                  <button
                    className="p-2 rounded hover:bg-gray-100 cursor-pointer"
                    onClick={() => setShowDeleteDialog(true)}
                  >
                    <Trash className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
            <p className="text-gray-700">👤 {book.author}</p>
            <p className="text-gray-600">
              📚 {book.genre} | 📅 {book.published_year}
            </p>
            <p className="text-yellow-600 mt-2 font-semibold">
              Average Rating: {book.average_rating?.toFixed(1) ?? "N/A"} / 5
            </p>
          </div>
          <ReviewList reviews={book.reviews} />
        </div>
      )}

      <DeleteDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onDelete={async () => {
          await onBookDelete();
          setShowDeleteDialog(false);
        }}
      />
      <ReviewModal
        isOpen={showReviewModal}
        onClose={() => {
          setShowReviewModal(false);
          fetchDetails();
        }}
        book={book.id}
        onSuccess={async () => {
          setShowReviewModal(false);
          // TODO: Fix auto refresh
          await fetchDetails();
        }}
      />

      {isAuthenticated && (
        <FloatingActionButton onClick={() => setShowReviewModal(true)} />
      )}
    </div>
  );
};

export default BookDetail;
