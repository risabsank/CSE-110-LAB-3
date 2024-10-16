import React, { useState, useEffect, useCallback } from 'react';
import { Note } from './types';
import { useContext } from 'react';
import { NotesContext } from './NotesContext';

function FavoriteButton({ note }: { note: Note }) {
    const [isFavorite, setIsFavorite] = useState(note.favorite);
    const { notes, setNotes } = useContext(NotesContext);

    const toggleFavorite = useCallback(() => {
        setIsFavorite((prevFavorite) => !prevFavorite);
    }, []);

    useEffect(() => {
        if (isFavorite && !notes.includes(note.title)) {
            setNotes([...notes, note.title]);
        }
        else if (!isFavorite && notes.includes(note.title)) {
            setNotes(notes.filter((title) => title !== note.title));
        }
    }, [isFavorite, note.title, notes, setNotes]);

    return (
        <button onClick={toggleFavorite}>{isFavorite ? '❤️' : '♡'}</button>
    );
}

export default FavoriteButton;

