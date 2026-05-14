"use client";
// app/http-methods/page.tsx
// Demonstrates the three main HTTP methods: GET, POST, and DELETE.
// This is a Client Component ("use client") because it uses useState and button interactions.

import { useState } from "react";
import Link from "next/link";

// Type for a post object returned by JSONPlaceholder
type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

export default function HttpMethodsPage() {
  // --- GET state ---
  const [getResult, setGetResult] = useState<Post | null>(null);
  const [getLoading, setGetLoading] = useState(false);

  // --- POST state ---
  const [postResult, setPostResult] = useState<Post | null>(null);
  const [postLoading, setPostLoading] = useState(false);

  // --- DELETE state ---
  const [deleteResult, setDeleteResult] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // =============================================
  // GET: Retrieve a single post by ID
  // =============================================
  const handleGet = async () => {
    setGetLoading(true);
    setGetResult(null); // Clear previous result

    try {
      // Simple GET request — no special headers or body needed
      const res = await fetch("https://jsonplaceholder.typicode.com/posts/1");
      const data: Post = await res.json();
      setGetResult(data);
    } catch (err) {
      console.error("GET request failed:", err);
    } finally {
      setGetLoading(false);
    }
  };

  // =============================================
  // POST: Create a new resource on the server
  // =============================================
  const handlePost = async () => {
    setPostLoading(true);
    setPostResult(null);

    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST", // Specify the HTTP method
        headers: {
          // Tell the server we're sending JSON data
          "Content-Type": "application/json",
        },
        // The new post data we want to create, serialised to JSON
        body: JSON.stringify({
          title: "My New Post",
          body: "This is the content of my brand new post.",
          userId: 1, // Pretend user ID 1 is creating this post
        }),
      });

      // JSONPlaceholder returns the newly created object with a fake ID (101)
      const data: Post = await res.json();
      setPostResult(data);
    } catch (err) {
      console.error("POST request failed:", err);
    } finally {
      setPostLoading(false);
    }
  };

  // =============================================
  // DELETE: Remove a resource from the server
  // =============================================
  const handleDelete = async () => {
    setDeleteLoading(true);
    setDeleteResult(null);

    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts/1", {
        method: "DELETE", // Specify the HTTP method
        // No body or Content-Type needed for DELETE
      });

      if (res.ok) {
        // JSONPlaceholder returns 200 with an empty object {} on successful delete
        setDeleteResult(
          "Success! Post #1 was deleted. Server responded with status: " +
            res.status,
        );
      } else {
        setDeleteResult("Delete failed. Status: " + res.status);
      }
    } catch (err) {
      console.error("DELETE request failed:", err);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      {/* Back link */}
      <Link
        href="/"
        className="text-sm text-blue-500 hover:underline mb-6 inline-block"
      >
        Back to all posts
      </Link>

      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        HTTP Methods Demo
      </h1>
      <p className="text-gray-500 text-sm mb-8">
        Click each button to send the corresponding HTTP request to the
        JSONPlaceholder API.
      </p>

      <div className="grid gap-6">
        {/* ============================
            GET Section
        ============================ */}
        <section className="border border-gray-200 rounded-lg p-5 bg-white shadow-sm">
          <div className="flex items-center gap-2 mb-1">
            {/* Method badge */}
            <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded">
              GET
            </span>
            <h2 className="text-lg font-semibold text-gray-700">
              Fetch Post #1
            </h2>
          </div>
          <p className="text-gray-400 text-xs mb-4">Endpoint: GET /posts/1</p>

          <button
            onClick={handleGet}
            disabled={getLoading}
            className="bg-green-500 hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            {getLoading ? "Fetching..." : "Send GET Request"}
          </button>

          {/* Show the API response once it arrives */}
          {getResult && (
            <div className="mt-4 bg-green-50 border border-green-200 rounded-md p-4">
              <p className="text-xs text-gray-400 mb-2 font-medium">
                Response:
              </p>
              <pre className="text-xs text-gray-700 whitespace-pre-wrap overflow-auto">
                {JSON.stringify(getResult, null, 2)}
              </pre>
            </div>
          )}
        </section>

        {/* ============================
            POST Section
        ============================ */}
        <section className="border border-gray-200 rounded-lg p-5 bg-white shadow-sm">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
              POST
            </span>
            <h2 className="text-lg font-semibold text-gray-700">
              Create a New Post
            </h2>
          </div>
          <p className="text-gray-400 text-xs mb-4">
            Endpoint: POST /posts — sends title, body, and userId in the request
            body
          </p>

          <button
            onClick={handlePost}
            disabled={postLoading}
            className="bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            {postLoading ? "Creating..." : "Send POST Request"}
          </button>

          {/* Show the created post returned by the API */}
          {postResult && (
            <div className="mt-4 bg-blue-50 border border-blue-200 rounded-md p-4">
              <p className="text-xs text-gray-400 mb-2 font-medium">
                Response (server echoes back the created post with a new ID):
              </p>
              <pre className="text-xs text-gray-700 whitespace-pre-wrap overflow-auto">
                {JSON.stringify(postResult, null, 2)}
              </pre>
            </div>
          )}
        </section>

        {/* ============================
            DELETE Section
        ============================ */}
        <section className="border border-gray-200 rounded-lg p-5 bg-white shadow-sm">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold bg-red-100 text-red-700 px-2 py-0.5 rounded">
              DELETE
            </span>
            <h2 className="text-lg font-semibold text-gray-700">
              Delete Post #1
            </h2>
          </div>
          <p className="text-gray-400 text-xs mb-4">
            Endpoint: DELETE /posts/1 — no request body needed
          </p>

          <button
            onClick={handleDelete}
            disabled={deleteLoading}
            className="bg-red-500 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            {deleteLoading ? "Deleting..." : "Send DELETE Request"}
          </button>

          {/* Show success or failure message */}
          {deleteResult && (
            <div className="mt-4 bg-red-50 border border-red-200 rounded-md p-4">
              <p className="text-sm text-gray-700">{deleteResult}</p>
              <p className="text-xs text-gray-400 mt-1">
                Note: JSONPlaceholder is a fake API — nothing is actually
                deleted.
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
