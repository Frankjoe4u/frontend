// app/posts/[id]/page.tsx
// Dynamic route — the [id] in the folder name is replaced by the actual post ID in the URL.
// Example: visiting /posts/5 will fetch post #5 from JSONPlaceholder.

import Link from "next/link";

type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

// Next.js passes URL segment values through `params` in App Router.
// We await params because Next.js 15+ makes it a Promise.
export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Unwrap the params Promise to get the actual id value
  const { id } = await params;

  // Fetch the specific post using the ID from the URL
  const res = await fetch("https://jsonplaceholder.typicode.com/posts/" + id, {
    cache: "no-store",
  });

  // Handle case where the post ID doesn't exist (e.g. /posts/999)
  if (!res.ok) {
    return (
      <main className="max-w-2xl mx-auto px-4 py-10">
        <p className="text-red-500 font-medium mb-4">Post not found.</p>
        <Link href="/" className="text-blue-500 hover:underline text-sm">
          Back to all posts
        </Link>
      </main>
    );
  }

  const post: Post = await res.json();

  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      {/* Back navigation */}
      <Link
        href="/"
        className="inline-flex items-center text-sm text-blue-500 hover:underline mb-6"
      >
        Back to all posts
      </Link>

      {/* Post article card */}
      <article className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
        {/* Post metadata */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs font-medium bg-blue-50 text-blue-600 px-2 py-1 rounded">
            Post #{post.id}
          </span>
          <span className="text-xs text-gray-400">By User #{post.userId}</span>
        </div>

        {/* Post title */}
        <h1 className="text-2xl font-bold text-gray-800 capitalize mb-4">
          {post.title}
        </h1>

        {/* Divider */}
        <hr className="border-gray-100 mb-4" />

        {/* Full post body */}
        <p className="text-gray-600 leading-relaxed">{post.body}</p>
      </article>
    </main>
  );
}
