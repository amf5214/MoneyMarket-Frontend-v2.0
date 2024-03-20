import axios from "axios";
import Path from "../path.service";

export const getTickerDetails = async (ticker:string, cookie:string) => {
    const response = await axios.post(`${Path.API_BASE}/stockdata/details`,
    {
        tickerName: ticker,
    },
    {
        headers: { 'Authorization': 'Bearer ' + cookie },
    });

    const data = await response.data;
    return data;
}