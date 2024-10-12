import React, { useEffect, useState } from "react";
import { auth } from "../config/firebase/firebaseconfig";
import { getSingleData } from "../config/firebase/firebasemethods";
import { onAuthStateChanged } from "firebase/auth";
function Navbar() {
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
  return (
    <>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">daisyUI</a>
        </div>
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
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
