import Link from "next/link";

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const res = await fetch("https://jsonplaceholder.typicode.com/posts/" + id);
  const post = await res.json();

  return (
    <main className="max-w-xl mx-auto px-4 py-10">
      <Link
        href="/"
        className="text-sm text-blue-500 hover:underline mb-6 inline-block"
      >
        Back
      </Link>

      <p className="text-xs text-gray-400 mb-1">Post #{post.id}</p>
      <h1 className="text-2xl font-bold text-gray-800 capitalize mb-4">
        {post.title}
      </h1>
      <p className="text-gray-600">{post.body}</p>
    </main>
  );
}