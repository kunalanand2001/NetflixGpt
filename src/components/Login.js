import React, { useState, useRef } from "react";
import Header from "./Header";
import { checkValidOrNot } from "../utils/validate";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const email = useRef(null);
  const password = useRef(null);

  const handleSubmitClick = () => {
    const message = checkValidOrNot(
      email.current.value,
      password.current.value
    );
    setErrorMessage(message);
  };

  return (
    <div>
      <div className="absolute">
        <Header />
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/ff5587c5-1052-47cf-974b-a97e3b4f0656/065df910-dec3-46ae-afa8-7ad2b52dce40/IN-en-20240506-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="login-bg"
        />
      </div>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute w-3/12 p-16 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80"
      >
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            className="p-2 my-4 w-full bg-gray-700"
            type="text"
            placeholder="Name"
          />
        )}
        <input
          ref={email}
          className="p-2 my-4 w-full bg-gray-700"
          type="text"
          placeholder="Email"
        />
        <input
          ref={password}
          className="p-2 my-4 w-full bg-gray-700"
          type="password"
          placeholder="Password"
        />
        <p className="text-red-700 font-bold italic">{errorMessage}</p>
        <button
          onClick={handleSubmitClick}
          className="p-4 my-4 w-full bg-red-700 rounded-lg"
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p
          className="mt-6 cursor-pointer hover:text-blue-700"
          onClick={toggleSignInForm}
        >
          {isSignInForm
            ? "New to Netflix? Sign Up now."
            : "Already have an account? Sign In now."}
        </p>
      </form>
    </div>
  );
};

export default Login;
