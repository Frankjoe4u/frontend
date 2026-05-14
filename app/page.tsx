
// app/page.tsx
// Fetches all posts from JSONPlaceholder and displays them as clickable cards.
// Clicking a post takes you to /posts/[id] for that specific post.

import Link from "next/link";

// Type definition for a single post object from JSONPlaceholder
type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

// This is an async Server Component — Next.js fetches data on the server at request time
export default async function HomePage() {
  // GET all 100 posts from JSONPlaceholder
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    cache: "no-store", // Disable caching so we always get fresh data
  });

  const posts: Post[] = await res.json();

  return (
    <main className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">All Posts</h1>
      <p className="text-gray-500 text-sm mb-8">
        Click any post to view it in full.
      </p>

      {/* Navigation links to the other pages */}
      <div className="flex gap-4 mb-8">
        <Link
          href="/http-methods"
          className="text-sm bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          HTTP Methods Demo
        </Link>
        <Link
          href="/form"
          className="text-sm bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
        >
          Registration Form
        </Link>
      </div>

      {/* Grid of post cards */}
      <div className="grid gap-4">
        {posts.map((post) => (
          // Each card links to /posts/[id]
          <Link
            key={post.id}
            href={"/posts/" + post.id}
            className="block p-5 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md hover:border-blue-400 transition-all"
          >
            {/* Post ID badge */}
            <span className="text-xs font-medium text-blue-500 mb-1 block">
              Post #{post.id}
            </span>

            {/* Post title — capitalize because JSONPlaceholder returns lowercase titles */}
            <h2 className="text-base font-semibold text-gray-800 capitalize mb-2">
              {post.title}
            </h2>

            {/* Truncated body preview */}
            <p className="text-gray-500 text-sm line-clamp-2">{post.body}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}