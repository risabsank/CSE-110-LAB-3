import { render, screen, fireEvent, within } from "@testing-library/react";
import { StickyNotes } from "./stickyNotes";

describe("Create StickyNote", () => {
    test("renders create note form", () => {
        render(<StickyNotes />);

        const createNoteButton = screen.getByText("Create Note");
        expect(createNoteButton).toBeInTheDocument();
    });

    test("creates a new note", () => {
        render(<StickyNotes />);

        // Please make sure your sticky note has a title and content input field with the following placeholders.
        const createNoteTitleInput = screen.getByPlaceholderText("Note Title");
        const createNoteContentTextarea =
            screen.getByPlaceholderText("Note Content");
        const createNoteButton = screen.getByText("Create Note");

        fireEvent.change(createNoteTitleInput, { target: { value: "New Note" } });
        fireEvent.change(createNoteContentTextarea, {
            target: { value: "Note content" },
        });
        fireEvent.click(createNoteButton);

        const newNoteTitle = screen.getByText("New Note");
        const newNoteContent = screen.getByText("Note content");

        expect(newNoteTitle).toBeInTheDocument();
        expect(newNoteContent).toBeInTheDocument();
    });

});

describe("Read StickyNote", () => {
    test('creates a new note and displays it', () => {
        render(<StickyNotes />);

        const titleInput = screen.getByPlaceholderText(/note title/i);
        const contentInput = screen.getByPlaceholderText(/note content/i);
        const labelSelect = screen.getByRole('combobox');

        fireEvent.change(titleInput, { target: { value: 'Test Note Title' } });
        fireEvent.change(contentInput, { target: { value: 'Test Note Content' } });
        fireEvent.change(labelSelect, { target: { value: 'Personal' } });

        const submitButton = screen.getByText(/create note/i);
        fireEvent.click(submitButton);

        const newNoteTitle = screen.getByText('Test Note Title');
        const newNoteContent = screen.getByText('Test Note Content');
        expect(newNoteTitle).toBeInTheDocument();
        expect(newNoteContent).toBeInTheDocument();
    });
    test('displays all notes created', () => {
        render(<StickyNotes />);

        const titleInput = screen.getByPlaceholderText(/note title/i);
        const contentInput = screen.getByPlaceholderText(/note content/i);
        const labelSelect = screen.getByRole('combobox');
        const submitButton = screen.getByText(/create note/i);

        const notesToCreate = [
            { title: 'First Note', content: 'First Content', label: 'Work' },
            { title: 'Second Note', content: 'Second Content', label: 'Study' },
        ];

        notesToCreate.forEach((note) => {
            fireEvent.change(titleInput, { target: { value: note.title } });
            fireEvent.change(contentInput, { target: { value: note.content } });
            fireEvent.change(labelSelect, { target: { value: note.label } });
            fireEvent.click(submitButton);
        });

        notesToCreate.forEach((note) => {
            const createdNoteTitle = screen.getByText(note.title);
            const createdNoteContent = screen.getByText(note.content);
            expect(createdNoteTitle).toBeInTheDocument();
            expect(createdNoteContent).toBeInTheDocument();
        });
    });

});

describe("Update StickyNote", () => {
    test('updates note content via edit button', () => {
        render(<StickyNotes />);

        // Create a new note
        const titleInput = screen.getByPlaceholderText("Note Title");
        const contentInput = screen.getByPlaceholderText("Note Content");
        const createNoteButton = screen.getByText("Create Note");

        fireEvent.change(titleInput, { target: { value: "Original Title" } });
        fireEvent.change(contentInput, { target: { value: "Original Content" } });
        fireEvent.click(createNoteButton);

        const editButtons = screen.getAllByText("Edit");
        const targetEditButton = editButtons[0];

        fireEvent.click(targetEditButton);

        const noteTitle = screen.getByText("Original Title");
        fireEvent.blur(noteTitle, { target: { innerText: "Updated Title" } });

        const noteContent = screen.getByText("Original Content");
        fireEvent.blur(noteContent, { target: { innerText: "Updated Content" } });

        expect(screen.getByText("Updated Title")).toBeInTheDocument();
        expect(screen.getByText("Updated Content")).toBeInTheDocument();
    });
});

describe("Delete StickyNote", () => {
    test('deletes a note and verifies it is removed from the list', () => {
        render(<StickyNotes />);

        const titleInput = screen.getByPlaceholderText("Note Title");
        const contentInput = screen.getByPlaceholderText("Note Content");
        const createNoteButton = screen.getByText("Create Note");

        fireEvent.change(titleInput, { target: { value: "Note to be Deleted" } });
        fireEvent.change(contentInput, { target: { value: "This note will be deleted." } });
        fireEvent.click(createNoteButton);

        expect(screen.getByText("Note to be Deleted")).toBeInTheDocument();
        expect(screen.getByText("This note will be deleted.")).toBeInTheDocument();

        const deleteButtons = screen.getAllByRole('button', { name: /x/i });

        fireEvent.click(deleteButtons[0]);

        expect(screen.queryByText("Note to be Deleted")).not.toBeInTheDocument();
        expect(screen.queryByText("This note will be deleted.")).not.toBeInTheDocument();
    });

});