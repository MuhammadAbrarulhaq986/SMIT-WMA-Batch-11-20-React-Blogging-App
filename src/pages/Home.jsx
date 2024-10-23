import React, { useEffect, useState } from "react";
import {
  getAllDocuments,
  getSingleData,
} from "../config/firebase/firebasemethods";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [userName, setUserName] = useState("");
  useEffect(() => {
    const fetchBlogs = async () => {
      const blogsData = await getAllDocuments("blogs");
      setBlogs(blogsData);
      console.log(blogs);
    };
    fetchBlogs();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8 mt-20">
      <h2
        className="text-3xl font-extrabold mb-4 text-center text-white bg-black "
        style={{ textShadow: "0px 0px 20px purple", borderRadius: 20 }}
      >
        Latest Blogs
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-center">
        {blogs.map((blog, index) => (
          <div
            key={index}
            className="bg-black text-white rounded shadow-md p-4"
            style={{
              borderRadius: 30,
            }}
          >
            <img
              className="w-full h-64 object-cover mb-4 "
              src={blog.image}
              alt={blog.title}
              style={{
                borderRadius: 20,
              }}
            />
            <h3 className=" text-white text-lg font-bold mb-2">{blog.title}</h3>
            <p className="text-white text-sm">{blog.description}</p>
            <div className="flex items-center mt-4">
              <img
                className="w-8 h-8 rounded-full mr-2"
                src={blog.authorImage}
                alt="Author"
              />
              <span className=" text-white text-sm">
                By {blog.authorUid} on {blog.date}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
