import "./App.css";
import Navbar from "./components/common/navbar";
import AddUpdateBook from "./components/core/books/addUpdateBook";
import BookDetail from "./components/core/books/bookdetail";
import AuthPage from "./pages/auth";
import { LandingPage } from "./pages/landing";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main
        className={`flex-1 bg-gray-100 ${
          isAuthPage ? "flex items-center justify-center" : ""
        }`}
      >
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/register" element={<AuthPage />} />
          <Route path="/books" element={<Navigate to="/" replace />} />
          <Route path="/books/:id" element={<BookDetail />} />
          <Route path="/add-book" element={<AddUpdateBook />} />
          <Route path="/update-book/:id" element={<AddUpdateBook />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
