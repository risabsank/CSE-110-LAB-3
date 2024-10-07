import './App.css';
import { dummyNotesList } from "./constants"; // Import the dummyNotesList from the appropriate module
import { Note } from "./types";
import ToggleTheme  from "./hooksExercise";
import FavoriteButton from "./favoriteButton";
import { useState } from 'react';
import { NotesContext } from "./NotesContext";

function App() {
  const [notes, setNotes] = useState([] as string[]);
  const value = {notes, setNotes};

 return (
  <NotesContext.Provider value={value}>
   <div className='app-container'>
    <ToggleTheme />
    <form className="note-form">
       <div><input placeholder="Note Title"></input></div>

       <div><textarea></textarea></div>

       <div><button type="submit">Create Note</button></div>

       <div className="notes-list">
          <h2>List of Favorites:</h2>
            {notes.map(note => <div key={note}>{note}</div>)}
       </div>
    </form>
    <div className="notes-grid">
       {dummyNotesList.map((note: Note) => (
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

