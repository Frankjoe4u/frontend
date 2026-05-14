import PostsList from "@/components/PostList";

export default function HomePage() {
  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold mb-6">All Posts</h1>

      <PostsList />
    </main>
  );
}
