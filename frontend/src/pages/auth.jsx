import { useLocation, Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { API } from "../utils/api";
import { useDispatch } from "react-redux";
import { login, setUser } from "../slices/authSlice";

const AuthPage = () => {
  const location = useLocation();
  const isLogin = location.pathname === "/login";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    const endpoint = isLogin ? API.login : API.register;
    try {
      const res = await axios.post(endpoint, data);
      const token = res.data.token;
      dispatch(login(token));

      const userRes = await axios.get(API.me, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      dispatch(setUser(userRes.data));

      navigate("/");
    } catch (err) {
      console.log(err);
      // setError("Authentication failed. Please check your credentials.");
    }
  };

  return (
    <div className="flex h-full w-full items-center justify-center bg-gray-100 px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6">
          {isLogin ? "Login" : "Register"}
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {!isLogin && (
            <div>
              <input
                type="text"
                placeholder="Name"
                className="w-full p-2 border border-gray-300 rounded"
                {...register("name", {
                  required: !isLogin ? "Name is required" : false,
                })}
              />
              {errors.name && (
                <span className="text-red-500 text-xs">Name is required</span>
              )}
            </div>
          )}
          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 border border-gray-300 rounded"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-red-500 text-xs">Email is required</span>
            )}
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 border border-gray-300 rounded"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <span className="text-red-500 text-xs">Password is required</span>
            )}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <Link
              to={isLogin ? "/register" : "/login"}
              className="text-blue-600 ml-2 hover:underline"
            >
              {isLogin ? "Register" : "Login"}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
