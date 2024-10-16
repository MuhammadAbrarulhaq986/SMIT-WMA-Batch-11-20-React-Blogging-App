import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import {
  addDatainDb,
  imageDownloadUrl,
  signUpUser,
  uploadImage,
} from "../config/firebase/firebasemethods";
// Component
const CreateBlog = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { userId } = params;
  const {
    CreateBlog,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const [registrationStatus, setRegistrationStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ifBlogSuccess, setIfBlogSuccess] = useState(false);

  // Handle Form Submission
  const onSubmit = async (data) => {
    setLoading(true);
    const image = data.profileImage[0];
    console.log(image);

    const generateId = () => {
      const randomId = [];
      for (let i = 0; i < 22; i++) {
        const randomNumber = Math.floor(Math.random() * 10);
        randomId.push(randomNumber);
      }
      return randomId.join("");
    };
    try {
      // Upload Image
      const imageUpload = await uploadImage(
        "profileImages",
        image,
        image?.name
      );
      const imageUrl = await imageDownloadUrl("profileImages", image?.name);
      console.log(imageUrl);
      const id = generateId();
      // Blog In Database
      const dataInDb = await addDatainDb("blogs", id, {
        blogId: id,
        title: data?.title,
        description: data.description,
        image: imageUrl,
        authorUid: userId,
      });
      setRegistrationStatus(true);
      setIfBlogSuccess(true);
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
    <div className="h-screen flex justify-center items-center">
      <div className="max-w-md p-4 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">CreateBlog</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <div>
            <input
              type="text"
              placeholder="Enter Blog Title"
              className="w-full p-2  border border-gray-400 rounded"
              {...register("title", { required: true })}
            />
            {errors.name && (
              <span className="text-red-500 text-[14px] font-semibold">
                This field is required
              </span>
            )}
          </div>
          <div>
            <textarea
              name="description"
              {...register("description", { required: true })}
              rows={6}
              className="w-full p-2 border border-gray-400 rounded"
              placeholder="Enter blog description"
            />
            {errors.email && (
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
              {...CreateBlog("profileImage", { required: true })}
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
              "CreateBlog"
            )}
          </button>
          <div>
            {registrationStatus ? (
              ifBlogSuccess ? (
                <span className="text-[14px] text-green-500 font-semibold">
                  Blog Created Successfully
                </span>
              ) : (
                <span className="text-[14px] text-red-500 font-semibold">
                  Creation Failed
                </span>
              )
            ) : null}
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
