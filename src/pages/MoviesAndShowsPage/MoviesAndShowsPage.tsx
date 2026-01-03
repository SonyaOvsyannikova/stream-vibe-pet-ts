import Hero from "@/widgets/Hero";
import ShowsPageMovie from "@/widgets/ShowsPageMovie/ShowsPageMovie.tsx";


const MoviesAndShowsPage = () => {


    return (
        <div className="container">
            <Hero
                variant="MoviesAndShowsPage"
            />
            <ShowsPageMovie />
        </div>
    );
};

export default MoviesAndShowsPage;