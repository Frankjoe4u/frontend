"use client";

import axios from "axios";

export default function HttpMethods() {
  // GET METHOD
  const handleGet = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts",
      );

      console.log("GET RESPONSE:", response.data);

      alert("GET Request Successful");
    } catch (error) {
      console.log(error);
    }
  };

  // POST METHOD
  const handlePost = async () => {
    try {
      const response = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        {
          title: "New Post",
          body: "This is a new post",
          userId: 1,
        },
      );

      console.log("POST RESPONSE:", response.data);

      alert("POST Request Successful");
    } catch (error) {
      console.log(error);
    }
  };

  // DELETE METHOD
  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        "https://jsonplaceholder.typicode.com/posts/1",
      );

      console.log("DELETE RESPONSE:", response.data);

      alert("DELETE Request Successful");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="space-y-5">
      <h1 className="text-3xl font-bold">HTTP Methods</h1>

      <div className="flex gap-4">
        <button
          onClick={handleGet}
          className="bg-blue-500 text-white px-5 py-2 rounded"
        >
          GET
        </button>

        <button
          onClick={handlePost}
          className="bg-green-500 text-white px-5 py-2 rounded"
        >
          POST
        </button>

        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-5 py-2 rounded"
        >
          DELETE
        </button>
      </div>
    </div>
  );
}