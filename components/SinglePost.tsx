"use client";

import axios from "axios";
import { useEffect, useState } from "react";

import { Post } from "@/types/post";

interface Props {
  id: string;
}

export default function SinglePost({ id }: Props) {
  // Store single post
  const [post, setPost] = useState<Post | null>(null);

  // Loading state
  const [loading, setLoading] = useState(true);

  // Fetch specific post
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get<Post>(
          `https://jsonplaceholder.typicode.com/posts/${id}`,
        );

        setPost(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  // Loading UI
  if (loading) {
    return <p>Loading post...</p>;
  }

  // If post not found
  if (!post) {
    return <p>Post not found</p>;
  }

  return (
    <div className="border rounded-lg p-6 shadow">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>

      <p className="text-gray-700 leading-7">{post.body}</p>
    </div>
  );
}
