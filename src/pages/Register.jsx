import React, { useRef, useState } from "react";
import {
  addDatainDb,
  signUpUser,
  uploadImage,
} from "../config/firebase/firebasemethods";
import { data } from "autoprefixer";

const Register = () => {
  const fullName = useRef();
  const email = useRef();
  const password = useRef();
  const profileImage = useRef();

  const [registrationStatus, setRegistrationStatus] = useState(false);

  const [loading, setLoading] = useState(false);

  // Handle Form Submission
  const handleRegister = async (data) => {
    setLoading(true);
    console.log(email.current.value);
    console.log(password.current.value);
    console.log(fullName.current.value);
    console.log(profileImage.current?.files[0]);
    try {
      const user = await signUpUser(data.email, data.password);
      console.log(user);
      const dataInDb = await addDatainDb("users", user.uid, {});
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="max-w-md p-4 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-2 mb-2 border border-gray-400 rounded"
          />
          <br />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 mb-2 border border-gray-400 rounded"
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 mb-2 border border-gray-400 rounded"
          />
          <br />
          <input
            type="file"
            placeholder="Enter your profile picture"
            ref={profileImage}
            className="w-full p-2 mb-2 border border-gray-400 rounded"
          />
          <br /> <br />
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
          <p className="text-green-500 mt-2">
            {registrationStatus
              ? "Registered Successfully"
              : "Registration failed"}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
