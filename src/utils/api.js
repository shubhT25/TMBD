import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const MY_TMDB_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MjQyYTI1M2EyMzFiNzU3NmM0N2NiZDlkZjRjNWEzMiIsInN1YiI6IjY0NWEwN2VmMTU2Y2M3MDE3ZDczNDcxOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gDRCAtKOAFFK8srbUfypu6-OqYHEqY2gdAMB8mnxMIM"
const headers = {
    Authorization: "bearer " + MY_TMDB_TOKEN
};

export const fetchDataFromAPI = async (url, params) => {
    try {
        const {data} = await axios.get(BASE_URL + url, {headers, params});
        return data;
    } catch (err) {
        return err;
    }
};

 