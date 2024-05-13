import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const handleSignOutPressed = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        //navigate to error.js (TODO)
      });
  };

  return (
    <div className="absolute bg-gradient-to-b from-black px-4 py-2 w-screen flex justify-between">
      <img
        className="w-56"
        src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
        alt="netflix logo"
      />
      {user && (
        <div className="flex p-2">
          <img className="w-12 h-12 rounded-lg" src={user?.photoURL} />
          <button
            onClick={handleSignOutPressed}
            className="bg-black text-white rounded-lg ml-4 p-2 h-10 font-bold bg-gradient-to-b from-red-900 hover:bg-gradient-to-t from-red-900"
          >
            (Sign Out)
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
