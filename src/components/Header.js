import React, { useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { NETFLIX_LOGO } from "../utils/constants";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });

    // unSubscribe when component unmounts
    return () => unSubscribe();
  }, []);

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
        src= {NETFLIX_LOGO}
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
