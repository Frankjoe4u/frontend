import SinglePost from "@/components/SinglePost";

interface Props {
  params: {
    id: string;
  };
}

export default function SinglePostPage({ params }: Props) {
  return (
    <main className="p-10">
      <SinglePost id={params.id} />
    </main>
  );
}
