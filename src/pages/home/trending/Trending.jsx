import { useState } from "react"
import Carousel from "../../../components/carousel/Carousel";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper"
import SwitchTabs from "../../../components/switchTabs/SwitchTabs"
import useFetch from "../../../hooks/useFetch";

const Trending = () => {

    const [timeWindow, setTimeWindow] = useState("day");

    const {data, loading} = useFetch(`/trending/all/${timeWindow}`);

    const onTabChange = (tab) => {
        setTimeWindow(tab === "Day" ? "day" : "week");
    }

  return (
    <div className="carouselSection">
        <ContentWrapper>
            <span className="carouselTitle">Trending</span>
            <SwitchTabs data={["Day", "Week"]} onTabChange={onTabChange} />
        </ContentWrapper>
        <Carousel data={data?.results} loading={loading}/>
    </div>
  )
}

export default Trending
