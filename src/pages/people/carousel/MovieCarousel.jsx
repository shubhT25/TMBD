/* eslint-disable react/prop-types */
import Carousel from "../../../components/carousel/Carousel";
import useFetch from "../../../hooks/useFetch";

const MovieCarousel = ({ id }) => {
    const {data, loading} = useFetch(`/person/${id}/movie_credits`)
    const topMovies = (cast) => {
        return cast?.sort((a, b) => (b.vote_average - a.vote_average))
    }
    return (
        <Carousel
            title="Top Movies"
            data={topMovies(data?.cast)}
            loading={loading}
            mediaType={"movie"}
        />
    );
};

export default MovieCarousel;
