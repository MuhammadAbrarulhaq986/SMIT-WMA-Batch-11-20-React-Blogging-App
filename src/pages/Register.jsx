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
      navigate("/")
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="max-w-md p-4 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <div>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-2  border border-gray-400 rounded"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <span className="text-red-500 text-[14px] font-semibold">
                This field is required
              </span>
            )}
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2  border border-gray-400 rounded"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-red-500 text-[14px] font-semibold">
                This field is required
              </span>
            )}
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2  border border-gray-400 rounded"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <span className="text-red-500 text-[14px] font-semibold">
                This field is required
              </span>
            )}
          </div>
          <div>
            <input
              type="file"
              placeholder="Enter your profile picture"
              className="w-full p-2  border border-gray-400 rounded"
              {...register("profileImage", { required: true })}
            />
            {errors.profileImage && (
              <span className="text-red-500 text-[14px] font-semibold">
                This field is required
              </span>
            )}
          </div>
          <button
            type="submit"
            className="bg-purple-500 text-white p-2 rounded disabled:bg-gray-400"
            disabled={loading}
          >
            {loading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-purple-500"></div>
            ) : (
              "Register"
            )}
          </button>
          <div>
            {registrationStatus ? (
              ifRegistrationSuccess ? (
                <span className="text-[14px] text-green-500 font-semibold">
                  Registered Successfully
                </span>
              ) : (
                <span className="text-[14px] text-red-500 font-semibold">
                  Registration Failed
                </span>
              )
            ) : null}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
