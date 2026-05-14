import Link from "next/link";

export default async function HomePage() {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=3",
  );
  const posts = await res.json();

  return (
    <main className="max-w-xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Posts</h1>

      <div className="flex gap-3 mb-8">
        <Link
          href="/http-methods"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
        >
          HTTP Methods
        </Link>
        <Link
          href="/form"
          className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md text-sm"
        >
          Form
        </Link>
      </div>

      <div className="grid gap-4">
        {posts.map((post: { id: number; title: string; body: string }) => (
          <Link
            key={post.id}
            href={"/posts/" + post.id}
            className="block p-4 border border-gray-200 rounded-lg hover:border-blue-400 transition-colors"
          >
            <p className="text-xs text-gray-400 mb-1">Post #{post.id}</p>
            <h2 className="font-semibold text-gray-800 capitalize">
              {post.title}
            </h2>
            <p className="text-sm text-gray-500 mt-1 line-clamp-2">
              {post.body}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}