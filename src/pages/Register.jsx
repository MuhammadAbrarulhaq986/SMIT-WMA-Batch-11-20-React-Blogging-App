import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  addDatainDb,
  imageDownloadUrl,
  signUpUser,
  uploadImage,
} from "../config/firebase/firebasemethods";
import { data } from "autoprefixer";
// Component
const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const [registrationStatus, setRegistrationStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ifRegistrationSuccess, setIfRegistrationSuccess] = useState(false);

  // Handle Form Submission
  const onSubmit = async (data) => {
    setLoading(true);
    const image = data.profileImage[0];
    console.log(image);

    try {
      // Sign IN USer
      const user = await signUpUser(data.email, data.password);
      console.log(user);

      // Upload Image
      const imageUpload = await uploadImage(
        "profileImages",
        image,
        image?.name
      );
      const imageUrl = await imageDownloadUrl("profileImages", image?.name);
      console.log(imageUrl);
      // USer In Database
      const dataInDb = await addDatainDb("users", user.uid, {
        uid: user?.uid,
        name: data?.name,
        email: data.email,
        profileImage: imageUrl,
      });
      setRegistrationStatus(true);
      setIfRegistrationSuccess(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      reset();
      setTimeout(() => {
        navigate("/");
      }, 500);
    }
  };

  return (
    <>
      <div className="h-screen flex justify-center items-center ">
        <div className="max-w-md p-6  shadow-lg rounded-lg border border-black bg-white">
          <h2 className="text-3xl font-bold mb-6 text-center text-black">
            Register
          </h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div>
              <input
                type="text"
                placeholder="Full Name"
                className="w-full p-3 border text-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <span className="text-red-500 text-sm">
                  This field is required
                </span>
              )}
            </div>
            <div>
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  This field is required
                </span>
              )}
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <span className="text-red-500 text-sm">
                  This field is required
                </span>
              )}
            </div>
            <div>
              <input
                type="file"
                className="w-full p-3 border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                {...register("profileImage", { required: true })}
              />
              {errors.profileImage && (
                <span className="text-red-500 text-sm">
                  This field is required
                </span>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 text-white p-3 rounded-lg transition duration-200 hover:bg-purple-700 disabled:bg-gray-400"
              disabled={loading}
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
              ) : (
                "Register"
              )}
            </button>
            <div>
              {registrationStatus &&
                (ifRegistrationSuccess ? (
                  <span className="text-sm text-green-500 font-semibold">
                    Registered Successfully
                  </span>
                ) : (
                  <span className="text-sm text-red-500 font-semibold">
                    Registration Failed
                  </span>
                ))}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
