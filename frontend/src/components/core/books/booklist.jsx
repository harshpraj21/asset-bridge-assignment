import { Link } from "react-router-dom";
import BookCard from "./bookcard";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../../utils/api";
import Spinner from "../../common/spinner";
import { getAuthors, getGenres } from "../../../api/books";
import Select from "react-select";

const BookList = () => {
  const [authors, setAuthors] = useState([]);
  const [genres, setGenres] = useState([]);
  const [books, setBooks] = useState([]);

  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [prevPageUrl, setPrevPageUrl] = useState(null);
  const [pageCount, setPageCount] = useState({ current: 1, total: 1 });

  const fetchBooks = useCallback(
    async (url, author, genre) => {
      try {
        setIsLoading(true);
        const queryParams = new URLSearchParams();
        if (author) queryParams.append("author", author);
        if (genre) queryParams.append("genre", genre);

        if (author || genre) url = `${url}?${queryParams.toString()}`;

        const res = await axios.get(url);
        setBooks(res.data.results);
        setNextPageUrl(res.data.next);
        setPrevPageUrl(res.data.previous);

        const currentPage = getPageFromUrl(url) || 1;
        const totalPages = Math.ceil(
          res.data.count / (res.data.results.length || 1)
        );
        setPageCount({ current: currentPage, total: totalPages });
      } catch (err) {
        console.error("Failed to fetch books:", err);
      } finally {
        setIsLoading(false);
      }
    },
    [selectedAuthor, selectedGenre]
  );

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const [authorRes, genreRes] = await Promise.all([
          getAuthors(),
          getGenres(),
        ]);
        setAuthors(authorRes.data ?? []);
        setGenres(genreRes.data ?? []);
      } catch (err) {
        console.error("Error fetching filters:", err);
      }
    };
    setAuthors("");
    setGenres("");
    fetchFilters();
  }, []);

  useEffect(() => {
    fetchBooks(API.books, selectedAuthor, selectedGenre);
  }, [selectedAuthor, selectedGenre, fetchBooks]);

  const handleNext = () => {
    if (nextPageUrl) {
      fetchBooks(nextPageUrl, selectedAuthor, selectedGenre);
    }
  };

  const handlePrev = () => {
    if (prevPageUrl) {
      fetchBooks(prevPageUrl, selectedAuthor, selectedGenre);
    }
  };

  const getPageFromUrl = (url) => {
    const params = new URLSearchParams(url?.split("?")[1]);
    return parseInt(params.get("page")) || 1;
  };

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="p-6 max-w-5xl mx-auto">
          <div className="flex gap-4 mb-6">
            {authors && (
              <div className="w-64">
                <Select
                  options={authors.map((author) => ({
                    value: author,
                    label: author,
                  }))}
                  value={
                    selectedAuthor
                      ? { value: selectedAuthor, label: selectedAuthor }
                      : null
                  }
                  onChange={(selected) =>
                    setSelectedAuthor(selected ? selected.value : "")
                  }
                  placeholder="Select Author"
                  isClearable
                />
              </div>
            )}
            {genres && (
              <div className="w-64">
                <Select
                  options={genres.map((genre) => ({
                    value: genre,
                    label: genre,
                  }))}
                  value={
                    selectedGenre
                      ? { value: selectedGenre, label: selectedGenre }
                      : null
                  }
                  onChange={(selected) =>
                    setSelectedGenre(selected ? selected.value : "")
                  }
                  placeholder="Select Genre"
                  isClearable
                />
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {books.map((book) => (
              <Link to={`/books/${book.id}`} key={book.id}>
                <BookCard book={book} />
              </Link>
            ))}
          </div>
          {books && books.length > 0 && (
            <div className="flex justify-center items-center mt-8 gap-4">
              <button
                onClick={handlePrev}
                className="bg-blue-400 text-white px-4 py-2 rounded disabled:opacity-50"
                disabled={!prevPageUrl}
              >
                Previous
              </button>
              <span className="text-gray-600">
                Page {pageCount.current} of {pageCount.total}
              </span>
              <button
                onClick={handleNext}
                className="bg-blue-400 text-white px-4 py-2 rounded disabled:opacity-50"
                disabled={!nextPageUrl}
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BookList;
