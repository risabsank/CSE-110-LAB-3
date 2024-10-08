import './App.css';
import { dummyNotesList } from "./constants"; // Import the dummyNotesList from the appropriate module
import { Note, Label } from "./types";
import ToggleTheme from "./hooksExercise";
import FavoriteButton from "./favoriteButton";
import { useContext, useState } from 'react';
import { NotesContext } from "./NotesContext";
import { ThemeContext, themes } from "./ThemeContext";

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

  // Theme state for all notes
  const [currentTheme, setCurrentTheme] = useState(themes.light);

  const createNoteHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const noteToAdd = {
      ...newNote,
      id: newNotes.length + 1,
    };

    setNewNotes([...newNotes, noteToAdd]);
    setNewNote(initialNote);
  };

  const [selectedNote, setSelectedNote] = useState(initialNote);
  const editNoteHandler = (note: Note) => {
    setSelectedNote(note);
  };

  const updateNote = (field: keyof Note, value: string) => {
    if (selectedNote) {
      const updatedNotes = newNotes.map(note =>
        note.id === selectedNote.id ? { ...note, [field]: value } : note
      );
      setNewNotes(updatedNotes);
    }
  };

  const deleteNote = (id: number) => {
    const newNotesList = newNotes.filter(note => note.id !== id);
    setNewNotes(newNotesList);
  };

  // General toggle theme button that affects all notes
  const toggleTheme = () => {
    setCurrentTheme(currentTheme === themes.light ? themes.dark : themes.light);
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
        </form>

        <button onClick={toggleTheme}>Toggle Theme</button>

        <div className="notes-grid">
          {newNotes.map((note) => (
            <NoteItem
              key={note.id}
              note={note}
              selectedNote={selectedNote}
              editNoteHandler={editNoteHandler}
              deleteNote={deleteNote}
              updateNote={updateNote}
              theme={currentTheme}
            />
          ))}
        </div>
      </div>
    </NotesContext.Provider>
  );
}

function NoteItem({
  note,
  selectedNote,
  editNoteHandler,
  deleteNote,
  updateNote,
  theme
}: {
  note: Note;
  selectedNote: Note;
  editNoteHandler: (note: Note) => void;
  deleteNote: (id: number) => void;
  updateNote: (field: keyof Note, value: string) => void;
  theme: typeof themes.light;
}) {
  return (
    <div
      className="note-item"
      style={{
        background: theme.background,
        color: theme.foreground,
        padding: "20px",
      }}
    >
      <div className="notes-header">
        <FavoriteButton note={note} />
        <button className="edit-button" onClick={() => editNoteHandler(note)}>Edit</button>
        <button onClick={() => deleteNote(note.id)}>x</button>
      </div>
      <h2
        contentEditable={selectedNote.id === note.id}
        onBlur={(event) => updateNote('title', event.target.innerText)}
      >
        {note.title}
      </h2>
      <p
        contentEditable={selectedNote.id === note.id}
        onBlur={(event) => updateNote('content', event.target.innerText)}
      >
        {note.content}
      </p>
      <p
        contentEditable={selectedNote.id === note.id}
        onBlur={(event) => updateNote('label', event.target.innerText)}
      >
        {note.label}
      </p>
    </div>
  );
}

export default App;