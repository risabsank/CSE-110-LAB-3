import { createContext } from "react";

export const NotesContext = createContext({
    notes: [] as string[],
    setNotes: (notes: string[]) => {},
});