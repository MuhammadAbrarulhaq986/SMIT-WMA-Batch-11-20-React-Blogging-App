// import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import {
//   auth,
//   getData,
//   sendData,
//   deleteDocument,
// } from "../config/firebase/firebasemethods";
// import { onAuthStateChanged } from "firebase/auth";
// import { useNavigate } from "react-router-dom";

// const Dashboard = () => {
//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//     reset,
//   } = useForm({
//     defaultValues: {
//       title: "",
//       description: "",
//     },
//   });

//   const [blogs, setBlogs] = useState([]);
//   const [submitting, setSubmitting] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const navigate = useNavigate();
//     const checkAuth = async () => {
//       if (auth) {
//         try {
//           onAuthStateChanged(auth, async (user) => {
//             if (user) {
//               console.log(user.uid);
//               // Get Blogs Data
//               const blogsData = await getData("blogs", user.uid);
//               console.log(blogsData);
//               setBlogs(blogsData);
//             } else {
//               console.log("No user is signed in");
//               navigate("/login");
//             }
//           });
//         } catch (error) {
//           console.error(error);
//         }
//       }
//       checkAuth();
//     };
//   }, []);

//   // Sending Blog to DataBase
//   const sendDatatoFirestore = async (data) => {
//     try {
//       setSubmitting(true);
//       await sendData(
//         {
//           title: data.title,
//           description: data.description,
//           uid: auth.currentUser.uid,
//         },
//         "blogs"
//       ).then((response) => {
//         const newBlog = {
//           title: data.title,
//           description: data.description,
//           uid: auth.currentUser.uid,
//         };
//         setBlogs((prevBlogs) => [...prevBlogs, newBlog]);
//         console.log(response);
//         setSubmitting(false);
//         reset();
//       });
//     } catch (error) {
//       setError(error.message);
//       setSubmitting(false);
//     }
//   };

//   const handleDeleteBlog = async (blog) => {
//     try {
//       if (blog.documentId) {
//         await deleteDocument("blogs", blog.documentId);
//         // setBlogs(blogs.filter((item) => item.documentId !== blog.documentId));
//       } else {
//         console.error("Blog ID is missing");
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8 mt-20">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div className="bg-white rounded shadow-md p-4">
//           <h2 className="text-lg font-bold mb-2 text-center">Add New Blog</h2>
//           <form onSubmit={handleSubmit(sendDatatoFirestore)}>
//             <div className="mb-4">
//               <label
//                 className="block text-gray-700 text-sm font-bold mb-2"
//                 htmlFor="title"
//               >
//                 Title
//               </label>
//               <input
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 id="title"
//                 type="text"
//                 {...register("title", { required: true })}
//               />
//               {errors.title && (
//                 <span className="text-red-500 text-xs">
//                   This field is required
//                 </span>
//               )}
//             </div>
//             <div className="mb-4">
//               <label
//                 className="block text-gray-700 text-sm font-bold mb-2"
//                 htmlFor="description"
//               >
//                 Description
//               </label>
//               <textarea
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 id="description"
//                 rows="5"
//                 {...register("description", { required: true })}
//               />
//               {errors.description && (
//                 <span className="text-red-500 text-xs">
//                   This field is required
//                 </span>
//               )}
//             </div>
//             {error && <span className="text-red-500 text-xs">{error}</span>}
//             <button
//               className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//               type="submit"
//               disabled={submitting}
//             >
//               {submitting ? "Submitting..." : "Add Blog"}
//             </button>
//           </form>
//         </div>
//         <div className="bg-white rounded shadow-md p-4">
//           <h2 className="text-lg font-bold mb-2">User Blogs</h2>
//           {blogs.length > 0 ? (
//             blogs.map((item, index) => {
//               return (
//                 <div
//                   key={index}
//                   className="bg-white rounded shadow-md p-4 mb-4"
//                 >
//                   <img
//                     className="w-full h-64 object-cover mb-4"
//                     src="https://picsum.photos/200/300" // Replace with actual image URL
//                     alt={item.title}
//                   />
//                   <h3 className="text-lg font-bold mb-2">{item.title}</h3>
//                   <p className="text-gray-700 text-sm">{item.description}</p>
//                   <div className="flex items-center mt-4">
//                     <img
//                       className="w-8 h-8 rounded-full mr-2"
//                       src="https://picsum.photos/200/100" // Replace with actual author image URL
//                       alt="Author"
//                     />
//                     <span className="text-gray-700 text-sm">
//                       By {auth.currentUser.displayName} on{" "}
//                       {new Date().toLocaleDateString()}
//                     </span>
//                     <button
//                       className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-4"
//                       onClick={() => handleDeleteBlog(item)}
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               );
//             })
//           ) : (
//             <p className="text-gray-700 text-sm">No blogs found</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
