import React from "react";
import { useSelector } from "react-redux";
import Img from "../../../components/lazyLoadImage/IMG";
import useFetch from "../../../hooks/useFetch";
import PosterFallback from "../../../assets/no-poster.png";
import "./style.scss";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import CircleRating from "../../../components/circleRating/CircleRating";
import dayjs from "dayjs";

// eslint-disable-next-line react/prop-types
const PersonBanner = ({id}) => {
    const {data, loading} = useFetch(`/person/${id}`)

    const { url } = useSelector((state) => state.home);

  return (
    <div className="peopleBanner">
        { !loading ? 
        ( <>
            {!!data && 
            <React.Fragment>
              <div className="backdrop-img">
                <Img src={url.backdrop + data?.profile_path} />
              </div>
              <div className="opacity-layer"></div>
              <ContentWrapper>
                <div className="content">
                  <div className="left">
                      {data.profile_path ? (
                        <Img
                          className="posterImg"
                          src={url.backdrop + data.profile_path}
                        />
                      ) : (
                        <Img className="posterImg" src={PosterFallback} />
                      )}
                  </div>
                  <div className="right">
                    <div className="title">
                      {data.name}
                    </div>
                    <div className="subtitle">{data.known_for_department}</div>
                    <div className="row">
                      <span className="rating-text">Popularity:</span>
                      <CircleRating rating={data.popularity.toFixed(1)} />
                    </div>
                    <div className="overview">
                      <div className="heading">Biography</div>
                      <div className="description">{data.biography}</div>
                      <a className="wikiLink" target="_blank" rel="noopener noreferrer"
                        href = {`https://en.wikipedia.org/wiki/${data.name}`}>Know more...</a>
                    </div>
                    <div className="info">
                      <div className="infoItem">
                        <span className="text bold">Gender: </span>
                        <span className="text">{data.gender == 2 ? "Male" : "Female"}</span>
                      </div>
                      {data.birthday && (
                        <div className="infoItem">
                          <span className="text bold">Born: </span>
                          <span className="text">
                            {dayjs(data.birthday).format("MMM D, YYYY")}
                          </span>
                        </div>
                      )}
                      {data.deathday && (
                        <div className="infoItem">
                          <span className="text bold">Died: </span>
                          <span className="text">
                            {dayjs(data.deathday).format("MMM D, YYYY")}
                          </span>
                        </div>
                      )}
                      {data.place_of_birth && (
                        <div className="infoItem">
                          <span className="text bold">Place of Birth: </span>
                          <span className="text">
                            {data.place_of_birth}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </ContentWrapper>
            </React.Fragment>}
        </> ):
        (
          <div className="personBannerSkeleton">
          <ContentWrapper>
            <div className="left skeleton"></div>
            <div className="right">
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
              <div className="row skeleton"></div>
            </div>
          </ContentWrapper>
        </div>
        )}
    </div>
  )
}

export default PersonBanner
