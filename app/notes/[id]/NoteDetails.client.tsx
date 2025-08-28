"use client";

import css from "./NoteDetails.module.css";

import { useParams } from 'next/navigation';

import { fetchNoteById } from "@/lib/api";

import { type Note } from "@/types/note";

import { useQuery } from "@tanstack/react-query";

export default function NoteDetailsClient() {
    const { id } = useParams<{ id: string }>();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["note", id],
        queryFn: () => fetchNoteById(id),
        refetchOnMount: false
    });

    const note: Note = data as Note;

    if (isLoading) return <p>Loading, please wait...</p>;
    if (isError) return <p>Something went wrong...</p>;

    return (
        <div className={css.container}>
	        <div className={css.item}>
	          <div className={css.header}>
	            <h2>{note.title}</h2>
	          </div>
	          <p className={css.content}>{note.content}</p>
	          <p className={css.date}>{note.createdAt}</p>
	        </div>
        </div>
    );
}