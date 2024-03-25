import axios from "axios";
import { NewsStory } from "./newsstory.dto";
import Path from "../path.service";
import { ApiError } from "../error.service";

const getNews = async (cookie:string) => {
    try {
        const result = await axios.post(`${Path.API_BASE}/news/market-news`,
        JSON.stringify({limit:3}), 
        {
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${cookie}`}
        });
        const jsonResult:NewsStory[] = await result.data;
        console.log(await jsonResult);
        return await jsonResult;
    } catch(err) {
        if(err.response.status === 401) {
            return ApiError.UNAUTHORIZED;
        }
    }
}

export default getNews;