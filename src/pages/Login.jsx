import React, { useEffect, useState } from "react";
import { auth } from "../config/firebase/firebaseconfig";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
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
    <div className="h-screen flex justify-center items-center">
      <div className="max-w-md p-4 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        <form onSubmit={handleSubmit(handleLogin)}>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 mb-2 border border-gray-400 rounded"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <span className="text-red-500">This field is required</span>
          )}
          <br />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 mb-2 border border-gray-400 rounded"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <span className="text-red-500">This field is required</span>
          )}
          <br />
          <button
            type="submit"
            className="bg-purple-500 text-white p-2 rounded disabled:bg-gray-400"
            disabled={loading}
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-purple-500"></div>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
