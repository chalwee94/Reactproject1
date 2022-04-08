import * as React from "react";
import {render} from "react-dom";
import {ListMovies, NewMovie} from "../application";
import {Simulate} from "react-dom/test-utils";
import {MemoryRouter} from "react-router-dom";

describe("Movies", () => {
    it("runs shows movies", () => {
        const movies = [
            {
                title: "ma famille",
                plot: "Ma famille is an Ivorian television series. The series \"became one of the greatest success stories in the history of Ivorian television production, reaching most Francophone African countries.\"[1]",
                year: 2002
            },
        ]
        const element = document.createElement("div");
        render(<ListMovies movies={movies}/>, element);
        expect(element.innerHTML).toMatchSnapshot();
    });

    it("creates new movie", () => {
        const element = document.createElement("div");
        const onAddMovie = jest.fn();
        render(<MemoryRouter><NewMovie onAddMovie={onAddMovie}/></MemoryRouter>, element);
        expect(element.innerHTML).toMatchSnapshot();
        Simulate.change(element.querySelector("input"), {target: {value: "Some movie"}});
        Simulate.submit(element.querySelector("form"));
        expect(onAddMovie).toBeCalledWith({
            title: "Some movie", year: "", plot: ""
        })
    })
})
