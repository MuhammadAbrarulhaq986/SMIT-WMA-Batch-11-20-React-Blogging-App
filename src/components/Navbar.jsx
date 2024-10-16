import React, { useEffect, useState } from "react";
import { auth } from "../config/firebase/firebaseconfig";
import { getSingleData, signOutUser } from "../config/firebase/firebasemethods";
import { onAuthStateChanged } from "firebase/auth";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bulma-components";
function Navbar() {
  const navigate = useNavigate();
  const [isUser, setIsUser] = useState(false);
  const [userData, setUserData] = useState(null);
  const user = auth;

  useEffect(() => {
    const getUserDataFromDb = async () => {
      try {
        onAuthStateChanged(auth, async (user) => {
          if (user) {
            console.log("User Found");
            const uid = user.uid;
            const reponse = await getSingleData("users", uid);
            setUserData(reponse);
            console.log(userData);
            setIsUser(true);
          } else {
            console.log("No User Found");
          }
        });
      } catch (error) {
        console.log(error);
      }
    };
    getUserDataFromDb();
  }, []);
  useEffect(() => {
    console.log(userData);
  }, [userData]);

  const logOut = async () => {
    try {
      await signOutUser();
    } catch (error) {
      console.log(error);
    } finally {
      navigate("/login");
    }
  };
  return (
    <>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">daisyUI</a>
        </div>
        {isUser ? 
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow"
              ></div>
          </div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
              >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={userData?.profileImage}
                  />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
              <li>
                <Link
                  to={`/profile/${userData?.uid}`}
                  className="justify-between"
                  >
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <button onClick={logOut}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
         : <button onClick={()=> navigate("/login")}>
          LogIn</button>}
      </div>
      </>
  );
}

export default Navbar;
