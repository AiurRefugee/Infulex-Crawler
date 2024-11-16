import { get, post } from "@/APIS/axiosWrapper.js";
import { onMounted, ref, computed } from "vue";
import {
    tmdbHeaders,
    tmdbAPIPrefix,
    getParams,
} from "@/config/tmdbConfig";
import {
    aiqiyiUrlPrefix,
    aiqiyiVideoListUrl,
    aiqiyiMapMedia,
} from "@/config/aiqiyiConfig";

const defaultArray = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "" ];


const nowPlayingUrl =
    "/discover/movie?include_video=false&sort_by=popularity.desc&with_release_type=2|3&release_date.gte={min_date}&release_date.lte={max_date}";
const popularMoviesUrl = "/trending/movie/week";
const topRatedUrl =
    "/discover/movie?include_adult=false&include_video=false&page=1&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200";
const upcomingUrl =
    "/discover/movie?include_video=false&sort_by=popularity.desc&with_release_type=2|3&release_date.gte={min_date}&release_date.lte={max_date}";
const popularTVUrl = "/trending/tv/week";
