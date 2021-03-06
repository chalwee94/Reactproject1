import * as React from "react";
import {useState} from "react";



function FrontPage() {
    return <div>
        <h1>Front Page</h1>
        <ul>
            <li><Link to={"/movies"}>List existing movies</Link></li>
            <li><Link to={"/movies/new"}>Add new movie</Link></li>
        </ul>
    </div>;
}

function MovieCard({movie: {year, title, plot}}) {
    return <div>
        <h2>{title} ({year})</h2>
        <div>{plot}</div>
    </div>;
}


export function ListMovies({movies}) {
    return <div>
        <h1>Movies</h1>
        {movies.map(m => <MovieCard key={m.title} movie={m}/>)}
    </div>;
}

export function NewMovie({onAddMovie}) {
    const [title, setTitle] = useState("");
    const [year, setYear] = useState("");
    const [plot, setPlot] = useState("");

    let navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        onAddMovie({
            title, year, plot
        });
        navigate("..");
    }

    return <form onSubmit={handleSubmit}>
        <h1>New movie</h1>
        <div>
            Title: <input value={title} onChange={e => setTitle(e.target.value)} />
        </div>
        <div>
            Year: <input value={year} onChange={e => setYear(e.target.value)} />
        </div>
        <div>
            Plot:
        </div>
        <div>
            <textarea value={plot} onChange={e => setPlot(e.target.value)} />
        </div>
        <div>
            <button>Submit</button>
        </div>
    </form>;
}

function Movies() {
    const [movies, setMovies] = useState([{
        title: "ma famille",
        plot: "Ma famille is an Ivorian television series. The series \"became one of the greatest success stories in the history of Ivorian television production, reaching most Francophone African countries.\"[1]",
        year: 2002


    }]);


    function handleAddMovie(newMovie) {
        setMovies(oldValue => [...oldValue, newMovie])
    }

    return <Routes>
        <Route path={""} element={<ListMovies movies={movies}/>}/>
        <Route path={"new"} element={<NewMovie onAddMovie={handleAddMovie}/>}/>
    </Routes>
}

export function MoviesApplication() {
    return <BrowserRouter>
        <Routes>
            <Route path={"/"} element={<FrontPage/>}/>
            <Route path={"/movies/*"} element={<Movies />}/>
        </Routes>
    </BrowserRouter>;
}