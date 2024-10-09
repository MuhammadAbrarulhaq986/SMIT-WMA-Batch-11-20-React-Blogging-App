// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { getCurrentUser, init } from "../config/firebase/firebasemethods";

// const Profile = () => {
//   const [user, setUser] = useState({});
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUser = async () => {
//       await init();
//       const currentUser = await getCurrentUser();
//       if (currentUser) {
//         setUser(currentUser);
//       } else {
//         navigate("/login");
//       }
//     };
//     fetchUser();
//   }, [navigate]);

//   return (
//     <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8 mt-20 flex flex-col items-center">
//       <h2 className="text-2xl font-bold mb-4">Profile</h2>
//       <img
//         className="w-24 h-24 rounded-full mb-4"
//         src={user.photoURL}
//         alt="Profile Picture"
//       />
//       <div className="flex flex-col space-y-2">
//         <p className="text-lg font-bold">Email: {user.email}</p>
//         <p className="text-lg font-bold">Username: {user.displayName}</p>
//       </div>
//       <div className="w-500 h-450 mt-4">
//         <img
//           className="w-full h-full object-cover"
//           src={user.photoURL}
//           alt={user.displayName}
//         />
//         <div className="flex justify-between items-center p-2 bg-gray-100">
//           <div>
//             <h3 className="text-lg font-bold">{user.displayName}</h3>
//             <p className="text-sm">{user.email}</p>
//           </div>
//           <img
//             className="w-8 h-8 rounded-full"
//             src={user.photoURL}
//             alt={user.displayName}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;
