import { useParams } from "react-router-dom"
import MovieCarousel from "./carousel/MovieCarousel";
import TVCarousel from "./carousel/TVCarousel";
import PersonBanner from "./personBanner/PersonBanner"

const People = () => {
  const { id } = useParams();
  return (
    <>
      <PersonBanner id={id} />
      <MovieCarousel id={id} />
      <TVCarousel id={id}/>
    </>
  )
}

export default People
