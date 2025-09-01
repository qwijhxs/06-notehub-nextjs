import {
  QueryClient,
  HydrationBoundary,
  dehydrate
} from "@tanstack/react-query";

import { fetchNoteById } from "@/lib/api";
import NoteDetailClient from "./NoteDetails.client";

interface NotesPageProps {
  params: Promise<{ id: string }>;
}

export default async function NoteDetailPage({ params }: NotesPageProps) {
  const { id } = await params;
  
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id)
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailClient />
    </HydrationBoundary>
  );
}