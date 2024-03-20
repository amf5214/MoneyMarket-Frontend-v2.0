import axios from "axios";
import { NewsStory } from "./newsstory.dto";
import Path from "../path.service";

const getNews = async (cookie:string) => {
    const result = await axios.post(`${Path.API_BASE}/news/market-news`,
    JSON.stringify({limit:3}), 
    {
        headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${cookie}`}
    });
    const jsonResult:NewsStory[] = await result.data;
    console.log(await jsonResult);
    return await jsonResult;
}

export default getNews;