import axios from "axios";
import Paths from "./paths.service";

export const getMarketStatus = async (cookie:string) => {
    const response = await axios.get(`${Paths.API_BASE}/stockdata/market-status`,
    {
        headers: {'content-type': "application/json", 'Authorization': 'Bearer ' + cookie },
    });
    console.log(response);
    return await response.data;
}