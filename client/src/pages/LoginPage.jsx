import React, { useState } from "react";
import assets from "../assets/assets";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const LoginPage = () => {
  const [currState, setCurrState] = useState("Sign up");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);

  const { login } = useContext(AuthContext);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (currState === "Sign up" && !isDataSubmitted) {
      setIsDataSubmitted(true);
      return;
    }

    login(currState === "Sign up" ? "signup" : "login", {
      fullName,
      email,
      password,
      bio,
    });
  };

  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl">
      <img src={assets.logo_big} className="w-[min(30vw,250px)]" alt="" />

      <form
        onSubmit={onSubmitHandler}
        action=""
        className="border-2 bg-white/8 text-white border-gray-500 p-5 flex flex-col gap-5 rounded-lg shadow-lg"
      >
        <h2 className="font-medium text-2xl flex justify-between items-center">
          {currState}{" "}
          {isDataSubmitted && (
            <img
              src={assets.arrow_icon}
              onClick={() => setIsDataSubmitted(false)}
              className="w-5 cursor-pointer"
              alt=""
            />
          )}
        </h2>

        {currState === "Sign up" && !isDataSubmitted && (
          <input
            type="text"
            className="p-2 border border-gray-500 rounded-md focus:outline-none"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        )}

        {!isDataSubmitted && (
          <>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              required
              className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-100"
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              required
              className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-100"
            />
          </>
        )}

        {currState === "Sign up" && isDataSubmitted && (
          <textarea
            rows={4}
            className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-100"
            placeholder="provide your bio..."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            required
          ></textarea>
        )}

        <button
          type="submit"
          className="py-3 bg-gradient-to-r from-purple-400 to-violet-600 text-white rounded-md cursor-pointer"
        >
          {currState === "Sign up" ? "Create Account" : "Login"}
        </button>

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <input type="checkbox" />
          <p>Agree to the terms of use and privacy policy</p>
        </div>

        <div className="flex flex-col gap-3">
          {currState === "Sign up" ? (
            <p className="text-sm text-gray-500">
              Already have an account?{" "}
              <span
                onClick={() => {
                  setCurrState("Login");
                  setIsDataSubmitted(false);
                }}
                className="font-medium text-violet-400 cursor-pointer hover:underline"
              >
                Login here
              </span>
            </p>
          ) : (
            <p className="text-sm text-gray-500">
              Create an account{" "}
              <span
                onClick={() => {
                  setCurrState("Sign up");
                }}
                className="font-medium text-violet-400 cursor-pointer hover:underline"
              >
                Click here
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
