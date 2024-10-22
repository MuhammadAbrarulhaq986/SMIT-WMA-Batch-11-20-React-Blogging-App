import React, { useEffect, useState } from "react";
import { auth } from "../config/firebase/firebaseconfig";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { addDatainDb, signInUser } from "../config/firebase/firebasemethods";
import { onAuthStateChanged } from "firebase/auth";
const Login = () => {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);

  useEffect(() => {
    const checkUser = () => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
          console.log("User Found");
          navigate("/");
        } else {
          console.log("User Not Found");
        }
      });
    };
    checkUser();
  }, []);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  // Handling Form Submit
  const handleLogin = async (data) => {
    setLoading(true);
    try {
      const user = await signInUser(data?.email, data?.password);
      console.log("Sign In Successfully" + user.uid);
    } catch (error) {
      console.log(error);
    } finally {
      reset();
      navigate("/");
    }
  };

  return (
    <>
      <div className="h-screen flex justify-center items-center ">
        <div className="max-w-md p-6  shadow-lg rounded-lg border border-black bg-white">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
            Login
          </h2>
          <form onSubmit={handleSubmit(handleLogin)}>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-red-500 text-sm mb-2">
                This field is required
              </span>
            )}
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <span className="text-red-500 text-sm mb-2">
                This field is required
              </span>
            )}
            <p className="text-center text-black mb-4">
              Don't have an account?{" "}
              <Link
                to={"/register"}
                className="text-purple-600 hover:underline font-bold transition duration-100 hover:font-extrabold"
              >
                Register
              </Link>
            </p>
            <button
              type="submit"
              className="w-full bg-purple-600 text-white p-3 rounded-lg transition duration-200 hover:bg-purple-700 disabled:bg-gray-400"
              disabled={loading}
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
              ) : (
                "Login"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
