"use client";

import { useState } from "react";

export default function HttpMethodsPage() {
  const [result, setResult] = useState("");

  // GET - fetch a post
  const handleGet = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts/1");
    const data = await res.json();
    setResult(JSON.stringify(data, null, 2));
  };

  // POST - create a new post
  const handlePost = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "Hello", body: "My new post", userId: 1 }),
    });
    const data = await res.json();
    setResult(JSON.stringify(data, null, 2));
  };

  // DELETE - delete a post
  const handleDelete = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts/1", {
      method: "DELETE",
    });
    setResult("Post deleted. Status: " + res.status);
  };

  return (
    <main className="max-w-xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">HTTP Methods</h1>

      <div className="flex gap-3 mb-6">
        <button
          onClick={handleGet}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm"
        >
          GET
        </button>
        <button
          onClick={handlePost}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
        >
          POST
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm"
        >
          DELETE
        </button>
      </div>

      {result && (
        <pre className="bg-gray-100 rounded-md p-4 text-sm text-gray-700 whitespace-pre-wrap">
          {result}
        </pre>
      )}
    </main>
  );
}
