"use client";
import Link from "next/link";
import React, { useState } from "react";
import { postImage, register } from "../utils/api";
import { toast } from "react-toastify";

const signup = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [file, setFile] = useState(null);

  const handleSignup = async (e) => {
    e.preventDefault();

    let FirstName = name ? (name.split(" ")[0] ? name.split(" ")[0] : "") : "";
    let LastName = name ? (name.split(" ")[1] ? name.split(" ")[1] : "") : "";
    let url = {};
    if (file) {
      const data = new FormData();
      data.append("files", file);
      const res = await postImage(data);
      url = res?.data[0];
    }
    const data = {
      username: name,
      email: email,
      password: password,
      FirstName: FirstName,
      LastName: LastName,
      Profile: url,
    };
    const result = await register(data);
    if (!result.jwt) {
      return toast(`${result}`, {
        hideProgressBar: true,
        autoClose: 2000,
        type: "error",
        position: "top-center",
      });
    }
    const token = result.jwt;
    toast("Signed in successfully", {
      hideProgressBar: true,
      autoClose: 2000,
      type: "success",
      position: "top-center",
    });
  };

  return (
    <div className="flex justify-center my-10">
      <form className="flex flex-col w-72 sm:w-96" onSubmit={handleSignup}>
        <h2 className="text-center text-4xl my-5">Sign Up</h2>
        <input
          type="text"
          placeholder="Enter your Name..."
          className=" outline-none py-2 px-3 text-lg w-full border-2 border-gray-600 h-14 my-5 "
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Enter your Email..."
          className=" outline-none py-2 px-3 text-lg w-full border-2 border-gray-600 h-14 my-5 "
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter your Password..."
          className=" outline-none py-2 px-3 text-lg w-full border-2 border-gray-600 h-14 my-5 "
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button className="border-2 rounded-full my-5 py-3 px-6 bg-green-300 hover:bg-gray-300 text-xl ">
          Submit
        </button>
        <p className=" text-center text-xl">
          Already have an account ?
          <Link href={"/login"}>
            <span className=" text-red-600 pb-2 border-b-2"> Login</span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default signup;
