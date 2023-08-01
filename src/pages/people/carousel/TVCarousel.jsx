/* eslint-disable react/prop-types */
import Carousel from "../../../components/carousel/Carousel";
import useFetch from "../../../hooks/useFetch";

const TVCarousel = ({id}) => {
    const {data, loading} = useFetch(`/person/${id}/tv_credits`)
    const topMovies = (cast) => {
        return cast?.sort((a, b) => (b.vote_average - a.vote_average))
    }
    return (
        <Carousel
            title="Top TV Shows"
            data={topMovies(data?.cast)}
            loading={loading}
            mediaType={"tv"}
        />
    );
};

export default TVCarousel;
