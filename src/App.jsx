import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getAPIConfiguration, getGenres } from "./store/homeSlice";
import { fetchDataFromAPI } from "./utils/api";
import { useDispatch } from "react-redux";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import SearchResult from "./pages/searchResult/SearchResult";
import Explore from "./pages/explore/Explore";
import PageNotFoundError from "./pages/404/Error";
import People from "./pages/people/People";

function App() {
  const dispatch = useDispatch();

  const fetchAPIConfigure = () => {
    fetchDataFromAPI("/configuration").then((res) => {
      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "h632",
      };
      dispatch(getAPIConfiguration(url));
    });
  };

  useEffect(() => {
    fetchAPIConfigure();
    genresCall();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const genresCall = async() => {
    let promises = []
    let mediaType = ["tv", "movie"]
    let allGenres = {}

    mediaType.forEach(media => {
      promises.push(fetchDataFromAPI(`/genre/${media}/list`))
    })

    const data = await Promise.all(promises)
    data.map(({genres}) => {
      return genres.map((item) => (allGenres[item.id] = item)
      ) 
    });
    dispatch(getGenres(allGenres))
  }

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/person/:id" element={<People />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="*" element={<PageNotFoundError />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
