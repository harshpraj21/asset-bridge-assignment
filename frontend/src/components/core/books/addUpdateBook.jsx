import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthToken } from "../../../utils/useAuthToken";
import { useEffect, useState } from "react";
import Spinner from "../../common/spinner";
import { addBook, getBook, updateBook } from "../../../api/books";

const AddUpdateBook = () => {
  const { id } = useParams();
  const isEditMode = !!id;
  const [isLoading, setIsLoading] = useState(isEditMode);
  const navigate = useNavigate();
  const token = useAuthToken();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    if (isEditMode) {
      getBook(id)
        .then((res) => {
          const book = res.data;
          console.log(book);

          setValue("title", book.title);
          setValue("author", book.author);
          setValue("genre", book.genre);
          setValue("published_year", book.published_year);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      if (isEditMode) {
        updateBook(id, data, token).then((res) => {
          const book = res.data;
          setValue("title", book.title);
          setValue("author", book.author);
          setValue("genre", book.genre);
          setValue("published_year", book.published_year);
        });
      } else {
        addBook(data, token).then((res) => {
          const book = res.data;
          setValue("title", book.title);
          setValue("author", book.author);
          setValue("genre", book.genre);
          setValue("published_year", book.published_year);
        });
      }
      setIsLoading(false);
      navigate("/");
    } catch (err) {
      console.error("Error adding book:", err);
    }
  };

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="max-w-xl mx-auto p-6 bg-white rounded shadow mt-10">
          <h2 className="text-2xl font-bold mb-4 text-center">
            {isEditMode ? "Update Book" : "Add a New Book"}
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Title"
                className="w-full p-2 border rounded"
                {...register("title", { required: true })}
              />
              {errors.title && (
                <p className="text-red-500 text-sm">Title is required</p>
              )}
            </div>
            <div>
              <input
                type="text"
                placeholder="Author"
                className="w-full p-2 border rounded"
                {...register("author", { required: true })}
              />
              {errors.author && (
                <p className="text-red-500 text-sm">Author is required</p>
              )}
            </div>
            <div>
              <input
                type="text"
                placeholder="Genre"
                className="w-full p-2 border rounded"
                {...register("genre", { required: true })}
              />
              {errors.genre && (
                <p className="text-red-500 text-sm">Genre is required</p>
              )}
            </div>
            <div>
              <input
                type="number"
                placeholder="Published Year"
                className="w-full p-2 border rounded"
                {...register("published_year", {
                  required: true,
                  min: 1000,
                  max: new Date().getFullYear(),
                })}
              />
              {errors.published_year && (
                <p className="text-red-500 text-sm">Enter a valid year</p>
              )}
            </div>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex-1 bg-gray-300 text-gray-800 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 w-full bg-blue-400 text-white py-2 rounded hover:bg-blue-500"
              >
                {isEditMode ? "Update Book" : "Add Book"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddUpdateBook;
