import './App.css';
import { dummyNotesList } from "./constants"; // Import the dummyNotesList from the appropriate module
import { Note, Label } from "./types";
import ToggleTheme from "./hooksExercise";
import FavoriteButton from "./favoriteButton";
import { useContext, useState } from 'react';
import { NotesContext } from "./NotesContext";
import { ThemeContext, themes } from "./ThemeContext";
import StickyNote from './stickyNotes';

function App() {

  return (
    <div>
      <StickyNote />
    </div>
  );
}

export default App;