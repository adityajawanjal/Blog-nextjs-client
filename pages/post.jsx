"use client";
import { useState } from "react";
import {
  fetchCategoriesBasic,
  postArticle,
  postImage,
  verifyUser,
} from "../utils/api";
import { useRouter } from "next/navigation";

const post = ({ user, categories }) => {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [category, setCategory] = useState();
  const [pic, setPic] = useState();

  const router = useRouter();

  const handlePost = async (e) => {
    e.preventDefault();

    let cat = categories?.filter((e) => e.attributes.Title === category)[0];
    let url;
    if (pic) {
      const data = new FormData();
      data.append("files", pic);
      const res = await postImage(data);
      url = res?.data[0];
    }
    const info = {
      data: {
        Title: title,
        Description: description,
        Slug: "a",
        Image: url,
        users_permissions_user: user,
        category: cat,
      },
    };
    const res = await postArticle(info);
    toast("Article posted successfully", {
      hideProgressBar: true,
      autoClose: 2000,
      type: "success",
      position: "top-center",
    });
  };

  if(!user || ! categories){
    setTimeout(()=>{
      router.push('/');
    },2000)
    
    return (
      <>
        <div className=" text-center my-10 text-5xl">
          <h2 className=" text-clip mb-5">Some Error Occured !</h2>
          <h3 >Redirecting...</h3>
        </div>
      </>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4">Post a Article !</h2>
      <form
        action="#"
        method="POST"
        encType="multipart/htmlForm-data"
        onSubmit={handlePost}
      >
        <div className="mb-4">
          <label
            htmlFor="text-input"
            className="block text-gray-700 font-bold mb-2"
          >
            Title :
          </label>
          <input
            type="text"
            id="text-input"
            name="text_input"
            className="w-full p-2 border rounded-md"
            placeholder="Enter Title..."
            onChange={(e) => setTitle(e.target.value)}
            value={title ? title : ""}
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="textarea-input"
            className="block text-gray-700 font-bold mb-2"
          >
            Description :
          </label>
          <textarea
            id="textarea-input"
            name="textarea_input"
            className="w-full p-2 border rounded-md"
            placeholder="Enter Description..."
            cols={60}
            rows={5}
            onChange={(e) => setDescription(e.target.value)}
            value={description ? description : ""}
            required
          ></textarea>
        </div>

        <div className="mb-4">
          <label
            htmlFor="file-input"
            className="block text-gray-700 font-bold mb-2"
          >
            Cover Photo:
          </label>
          <input
            type="file"
            id="file-input"
            name="file_input"
            className="w-full p-2 border rounded-md"
            onChange={(e) => setPic(e.target.files[0])}
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="select-input"
            className="block text-gray-700 font-bold mb-2"
          >
            Select Category:
          </label>
          <select
            id="select-input"
            name="select_input"
            className="w-full p-2 border rounded-md"
            onChange={(e) => {
              setCategory(e.target.selectedOptions[0].innerText);
            }}
            required
          >
            {categories?.map((e) => {
              return (
                <option key={e.id} value={e}>
                  {e.attributes.Title}
                </option>
              );
            })}
          </select>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export const getServerSideProps = async ({ req, res }) => {
  if (!req.cookies.token) {
    return {
      props: {},
    };
  }
  const res1 = await verifyUser(req.cookies.token);
  if (!res1.email) {
    return {
      props: {},
    };
  }
  const res2 = await fetchCategoriesBasic();

  return {
    props: {
      user: res1,
      categories: res2.data,
    },
  };
};

export default post;
