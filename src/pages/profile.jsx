import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleData } from "../config/firebase/firebasemethods"; // Ensure the path is correct

const Profile = () => {
  const [user, setUser] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getSingleData("users", id); // Fetch user data using the id
        setUser(userData); // Set the user state with the fetched data
      } catch (err) {
        setError(err); // Set error state if fetching fails
        console.error("Error fetching user data:", err);
      }
    };

    fetchUser();
  }, [id]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 ">
      <h1
        className="text-3xl font-extrabold mb-4 text-center text-white "
        style={{
          textShadow: "0px 0px 20px purple",
          backgroundColor: "black",
          borderRadius: 20,
          padding: 10,
        }}
      >
        Profile
      </h1>
      {error ? (
        <p className="text-red-500 font-bold">{error}</p> // Display error message if any
      ) : (
        <div className="card w-96 bg-base-100 shadow-xl">
          <figure>
            <img
              src={user.imageUrl}
              alt={`${user.name}'s profile`}
              className="w-full h-48 object-cover rounded-t-lg"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title text-2xl">{user.name}</h2>
            <p className="text-lg">User ID: {id}</p>
            <p className="text-lg">Email: {user.email}</p>
            {/* Add other user properties as needed */}
            <div className="card-actions justify-end">
              <button
                className="btn bg-purple-700 text-white"
                onClick={() => navigate("/")}
              >
                Back
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
