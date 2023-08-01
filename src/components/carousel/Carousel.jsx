/* eslint-disable react/prop-types */
import { useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill} from "react-icons/bs";
import "./style.scss";
import Img from "../lazyLoadImage/IMG";
import PosterFallBack from "../../assets/no-poster.png";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";
import dayjs from "dayjs";

const Carousel = ({data, loading, mediaType, title}) => {
    const carouselContainer = useRef();
    const {url} = useSelector((state) => state.home);
    const navigate = useNavigate();

    const navigation = (dir) => {
        const container = carouselContainer.current;
        const scrollAmount = dir === "left" ? container.scrollLeft - (container.offsetWidth + 20) :
                                container.scrollLeft + (container.offsetWidth + 20);
        container.scrollTo(
            {
                left: scrollAmount,
                behavior: "smooth"
            }
        )
    }
    
    const skItem = () => {
        return (
            <div className="skeletonItem">
                <div className="posterBlock skeleton"></div>
                <div className="textBlock skeleton">
                    <div className="title skeleton"></div>
                    <div className="date skeleton"></div>
                </div>
            </div>
        )
    }

  return (
    <div className="carousel">
        <ContentWrapper>
            {title && <div className="carouselTitle">{title}</div>}
            <BsFillArrowLeftCircleFill className="carouselLeftNav arrow"
                onClick={() => navigation("left")} />

            <BsFillArrowRightCircleFill className="carouselRightNav arrow"
                onClick={() => navigation("right")} />
            {!loading ? (
                <div className="carouselItems" ref={carouselContainer}>
                    {data?.map((item) => {
                        const posterUrl = item.poster_path ? 
                            url.poster + item.poster_path : item.profile_path ? 
                            url.poster + item.profile_path : PosterFallBack;
                        const rating = item.vote_average ? item.vote_average?.toFixed(1) :
                                        item.popularity?.toFixed(1)
                        return (
                            <div key = {item.name} className="carouselItem" 
                            onClick={() => navigate(`/${item.media_type || mediaType}/${item.id}`)}>
                                <div className="posterBlock">
                                    <Img src={posterUrl}/>
                                    <CircleRating rating={rating} />
                                    <Genres data={item.genre_ids?.slice(0,2)}/>
                                </div>
                                <div className="textBlock">
                                    <span className="title">
                                        {item.title || item.name}
                                    </span>
                                    <span className="date">
                                     {item.release_date && dayjs(item.release_date).format("MMM D, YYYY")}
                                    </span>
                                </div>
                            </div>
                        )
                    })}
                </div>
            ) : (
                <div className="loadingSkeleton">
                    {skItem()}
                    {skItem()}
                    {skItem()}
                    {skItem()}
                    {skItem()}
                </div>
            )}
        </ContentWrapper>
    </div>
  )
}

export default Carousel
