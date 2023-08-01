import "./style.scss"
import HeroBanner from "./heroBanner/HeroBanner"
import Trending from "./trending/Trending";
import Popular from "./popular/Popular";
import TopRated from "./topRated/TopRated";
import PopularPeople from "./popularPeople/PopularPeople";

const Home = () => {
  return (
    <div className="homePage">
      <HeroBanner/>
      <Trending/>
      <Popular/>
      <TopRated />
      <PopularPeople/>
    </div>
  )
}

export default Home
