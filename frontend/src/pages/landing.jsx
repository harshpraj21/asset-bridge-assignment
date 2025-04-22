import { useSelector } from "react-redux";
import FloatingActionButton from "../components/common/FAB";
import BookList from "../components/core/books/booklist";

export const LandingPage = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <div>
      <BookList />
      {isAuthenticated && <FloatingActionButton toNavigate={"/add-book"} />}
    </div>
  );
};
