import * as React from "react";
import * as ReactDOM from "react-dom";
import {BrowserRouter, Link, Route, Routes, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";



function FrontPage() {
    return <div>
        <h1>create my first react project1</h1>
        <ul>
            <li><Link to="/movies">List movies</Link></li>
            <li><Link to={"/movies/new"}>Add Movie</Link></li>
        </ul>
    </div>;
}
const MOVIES = [
    {
        title: "ma famille",
        plot: "Ma famille is an Ivorian television series. The series \"became one of the greatest success stories in the history of Ivorian television production, reaching most Francophone African countries.\"[1]",
        year: 2002
    },
    {
        title: "when they see us",
        plot: "Not to be confused with the April 19, 1989 criminal case, the 2012 film about the case, the 2019 opera based on the case",
        year: 2019
    },
]

function MovieCard({movie}) {
    const {title, plot, year} = movie;
    return <div>
        <h2>{title} ({year})</h2>
        <p>{plot}</p>
    </div>;
}

function ListMovies() {
    return <div>
        <h1>Movies</h1>
        {MOVIES.map(movie => <MovieCard key={movie.title} movie={movie}/>)}
    </div>;
}

function CreateMovies() {
    const [title, setTitle] = useState("");
    const [year, setYear] = useState("");
    const [plot, setPlot] = useState("");

    const [newMovie, setNewMovie] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        setNewMovie({title, year, plot});
    }, [title, year, plot]);

    function handleSubmit(event) {
        event.preventDefault();
        MOVIES.push(newMovie);
        navigate("..");
    }
    return <form onSubmit={handleSubmit}>
        <h1>Create new movie</h1>
        <div>
            Title:
            <input value={title} onChange={event => setTitle(event.target.value)} />
        </div>
        <div>
            Year:
            <input value={year} onChange={event => setYear(event.target.value)} />
        </div>
        <div>
            <div>Plot:</div>
            <textarea value={plot} onChange={event => setPlot(event.target.value)} />
        </div>
        <button>Save</button>
        <pre>
            {JSON.stringify(newMovie)}
        </pre>
    </form>;
}


function MovieApplication() {
    return <Routes>
        <Route path={"/"} element={<ListMovies/>}/>
        <Route path={"/new"} element={<CreateMovies/>}/>
        <Route path={"*"} element={<h1>Movie not found</h1>}/>
    </Routes>
}

function Application() {

    return <BrowserRouter>
        <Routes>
            <Route path={"/"} element={<FrontPage/>}/>
            <Route path={"/movies/*"} element={<MovieApplication />}/>
            <Route path={"*"} element={<h1>Not found</h1>}/>
        </Routes>
    </BrowserRouter>;
}

ReactDOM.render(
    <Application/>,
    document.getElementById("app")
);

