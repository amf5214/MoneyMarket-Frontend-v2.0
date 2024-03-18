import axios from "axios";
import Paths from "./paths.service";
import { ActiveStock } from "./activestock";

export const getMarketStatus = async (cookie:string) => {
    const response = await axios.get(`${Paths.API_BASE}/stockdata/market-status`,
    {
        headers: {'content-type': "application/json", 'Authorization': 'Bearer ' + cookie },
    });
    return await response.data;
}

export const getWLAStocks = async (cookie:string) => {
    const response:any = await axios.get(`${Paths.API_BASE}/stockdata/winners-losers`,
    {
        headers: { 'Authorization': 'Bearer ' + cookie },
    });

    const mostActive:ActiveStock[] = [];

    await response.data.top_gainers.forEach((item:any) => {
        mostActive.push(new ActiveStock(item.ticker, item.price, item.change_amount, item.change_percentage, item.volume));
    })

    await response.data.most_actively_traded.forEach((item:any) => {
        mostActive.push(new ActiveStock(item.ticker, item.price, item.change_amount, item.change_percentage, item.volume));
    })

    await response.data.top_losers.forEach((item:any) => {
        mostActive.push(new ActiveStock(item.ticker, item.price, item.change_amount, item.change_percentage, item.volume));
    })

    return {
        update_time: await response.last_updated,
        mostActive: mostActive
    };
}