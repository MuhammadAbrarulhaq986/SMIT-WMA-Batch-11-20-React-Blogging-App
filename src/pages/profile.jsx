import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleData } from "../config/firebase/firebasemethods";

const Profile = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  // Yahan pr firebase pr request krni  hai  for user Data ;
  // getSingleData 

    //   useEffect(() => {
    //     const fetchUser = async () => {
    //       const currentUser = await getCurrentUser();
    //       if (currentUser) {
    //         setUser(currentUser);
    //       } else {
    //         navigate("/login");
    //       }
    //     };
    //     fetchUser();
    //   }, []);

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8 mt-20 flex flex-col items-center">
      <h1>Profile</h1>
      <p className="text-[#fff]">{id}</p>
    </div>
  );
};

export default Profile;
