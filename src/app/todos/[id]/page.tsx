import TodoDetail from "@/components/todoDetail";

export default function TodoDetailPage({ params }: { params: { id: string } }) {
  // params.id is directly passed to the client component
  return <TodoDetail id={params.id} />;
}
