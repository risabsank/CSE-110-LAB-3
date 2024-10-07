import './App.css';
import { dummyNotesList } from "./constants"; // Import the dummyNotesList from the appropriate module
import { Note, Label } from "./types";
import ToggleTheme from "./hooksExercise";
import FavoriteButton from "./favoriteButton";
import { useState } from 'react';
import { NotesContext } from "./NotesContext";

function App() {
  const [notes, setNotes] = useState([] as string[]);
  const value = { notes, setNotes };

  const initialNote: Note = {
    id: -1,
    title: "",
    content: "",
    label: Label.other,
    favorite: false,
  };
  const [newNotes, setNewNotes] = useState<Note[]>(dummyNotesList);

  const [newNote, setNewNote] = useState<Note>(initialNote);

  const createNoteHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const noteToAdd = {
      ...newNote,
      id: newNotes.length + 1,
    };

    setNewNotes([...newNotes, noteToAdd]);

    setNewNote(initialNote);
  };

  return (
    <NotesContext.Provider value={value}>
      <div className='app-container'>
        <ToggleTheme />
        <form className="note-form" onSubmit={createNoteHandler}>
          <div>
            <input
              placeholder="Note Title"
              value={newNote.title}
              onChange={(event) =>
                setNewNote({ ...newNote, title: event.target.value })}
              required
            />
          </div>

          <div>
            <textarea
              placeholder="Note Content"
              value={newNote.content}
              onChange={(event) =>
                setNewNote({ ...newNote, content: event.target.value })}
              required
            />
          </div>

          <div>
            <select
              value={newNote.label}
              onChange={(event) =>
                setNewNote({ ...newNote, label: event.target.value as Label })}
              required
            >
              <option value={Label.personal}>Personal</option>
              <option value={Label.study}>Study</option>
              <option value={Label.work}>Work</option>
              <option value={Label.other}>Other</option>
            </select>
          </div>

          <div>
            <button type="submit">Create Note</button>
          </div>
          <div className="notes-list">
            <h2>List of Favorites:</h2>
            {notes.map(note => <div key={note}>{note}</div>)}
          </div>
        </form>
        <div className="notes-grid">
          {newNotes.map((note: Note) => (
            <div
              key={note.id}
              className="note-item">
              <div className="notes-header">
                <FavoriteButton note={note} />
                <button>x</button>
              </div>
              <h2> {note.title} </h2>
              <p> {note.content} </p>
              <p> {note.label} </p>
            </div>
          ))}
        </div>
      </div>
    </NotesContext.Provider>
  );
}

export default App;

