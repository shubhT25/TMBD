import Carousel from "../../../components/carousel/Carousel";
import useFetch from "../../../hooks/useFetch"

const PopularPeople = () => {
    const {data, loading} = useFetch('/person/popular')
    console.log("Popular", data);
  return (
    <div className="carouselSection">
        <Carousel data={data?.results} loading={loading} mediaType='person' title='Popular People'/>
    </div>
  )
}

export default PopularPeople
