import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../slices/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <nav className="bg-blue-400 text-white py-4">
      <div className="w-full flex items-center justify-between">
        <Link to="/" className="text-xl font-bold  ml-6">
          Book Review
        </Link>

        <div>
          <Link to="/" className="mr-6 hover:underline">
            Home
          </Link>
          {isAuthenticated ? (
            <button
              onClick={() => dispatch(logout())}
              className="mr-6 hover:underline"
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className="mr-6 hover:underline">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
