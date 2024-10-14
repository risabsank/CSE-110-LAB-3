import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom"; // For using useParams
import { ToDoList } from "./toDoList";
import { dummyGroceryList } from "./constants";

jest.mock("./constants", () => ({
    dummyGroceryList: [
        { name: "Apples", isPurchased: false },
        { name: "Bananas", isPurchased: false },
        { name: "Carrots", isPurchased: false },
    ],
}));

describe("ToDoList Component", () => {
    beforeEach(() => {
        document.body.innerHTML = "";
    });

    test("displays all items in the list", () => {
        render(
            <Router>
                <ToDoList />
            </Router>
        );
        dummyGroceryList.forEach((item) => {
            expect(screen.getByText(item.name)).toBeInTheDocument();
        });
    });

    test("displays the correct number of items checked", () => {
        render(
            <Router>
                <ToDoList />
            </Router>
        );

        const itemsBoughtText = screen.getByText(/Items bought:/);
        expect(itemsBoughtText).toHaveTextContent("Items bought: 0");

        const checkbox = screen.getByLabelText("Apples");
        fireEvent.click(checkbox);
        expect(itemsBoughtText).toHaveTextContent("Items bought: 1");

        const checkbox2 = screen.getByLabelText("Bananas");
        fireEvent.click(checkbox2);
        expect(itemsBoughtText).toHaveTextContent("Items bought: 2");
    });
});