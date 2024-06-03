import React, { useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { NETFLIX_LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
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

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  const handelGptSearchClick = () => {
    //Toggle Gpt Search.
    dispatch(toggleGptSearchView());
  };

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
    <div className="absolute bg-gradient-to-b from-black px-4 py-2 w-screen flex flex-col md:flex-row justify-between z-10">
      <img
        className="w-44 mx-auto md:mx-0"
        src={NETFLIX_LOGO}
        alt="netflix logo"
      />
      {user && (
        <div className="flex p-2 justify-between">
          {showGptSearch && (
            <select
              className="ml-4 p-2 h-10 mx-4 bg-gray-900 text-white rounded-lg"
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGES.map((language) => (
                <option key={language.identifier} value={language.identifier}>
                  {language.name}
                </option>
              ))}
            </select>
          )}
          <button
            className="text-white rounded-lg ml-4 p-2 h-15 md:h-10 mx-4 font-bold bg-violet-900"
            onClick={handelGptSearchClick}
          >
            {showGptSearch ? "Home Page" : "GPT Search"}
          </button>
          <img className="w-12 h-12 rounded-lg" src={user?.photoURL} />
          <button
            onClick={handleSignOutPressed}
            className="bg-black text-white rounded-lg ml-4 p-2 h-15 md:h-10 font-bold bg-gradient-to-b from-red-900 hover:bg-gradient-to-t"
          >
            (Sign Out)
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
