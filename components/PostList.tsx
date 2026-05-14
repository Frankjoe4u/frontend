"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Post } from "@/types/post";

export default function PostsList() {
  // Store all posts
  const [posts, setPosts] = useState<Post[]>([]);

  // Loading state
  const [loading, setLoading] = useState(true);

  // Fetch posts on page load
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get<Post[]>(
          "https://jsonplaceholder.typicode.com/posts",
        );

        setPosts(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Loading UI
  if (loading) {
    return <p>Loading posts...</p>;
  }

  return (
    <div className="grid gap-4">
      {posts.map((post) => (
        <div key={post.id} className="border rounded-lg p-5 shadow">
          <h2 className="font-bold text-xl mb-2">{post.title}</h2>

          <p className="text-gray-600 mb-4">{post.body}</p>

          {/* Navigate to single post */}
          <Link
            href={`/posts/${post.id}`}
            className="bg-black text-white px-4 py-2 rounded"
          >
            View Post
          </Link>
        </div>
      ))}
    </div>
  );
}
