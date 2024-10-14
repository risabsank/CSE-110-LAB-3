import './App.css';
import StickyNotes from './stickyNotes';
import { ToDoList } from './toDoList';
import { Route, Routes } from "react-router-dom";
import { Navbar } from "./navbar";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<StickyNotes />} />
        <Route path="/todolist/:name" element={<ToDoList />} />
      </Routes>
    </div>
  );
};

export default App;