import React, { useState, useEffect } from 'react';
import { Note } from './types';
import { useContext } from 'react';
import { NotesContext } from './NotesContext';

function FavoriteButton({ note }: { note: Note }) {
    const [isFavorite, setIsFavorite] = useState(note.favorite);
    const { notes, setNotes } = useContext(NotesContext);

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
        if (isFavorite) {
            const index = notes.indexOf(note.title);
            if (index > -1) {
                notes.splice(index, 1);
            }
        } else {
            notes.push(note.title);
        }
        console.log(notes);
    };

    useEffect(() => {
        note.favorite = isFavorite; // Update the 'favorite' property of the note instance
        setNotes([...notes]);
    }, [isFavorite, note, setNotes, notes]);

    return (
        <button onClick={toggleFavorite}>{isFavorite ? '❤️' : '♡'}</button>
    );
}

export default FavoriteButton;

