import Hero from "@/shared/ui/Hero";
import {useState} from "react";
import {moviesId} from "@/shared/api/Client";

const MoviesOpenPage = () => {
    const [movies, setMovies] = useState([]);

    const getMovieId = async () => {
        try {
            const response = await moviesId()
            return response.data;
        }
        catch(error) {
            console.log(error);
        }
    }

    return (
        <div>
            <Hero />
        </div>
    );
};

export default MoviesOpenPage;