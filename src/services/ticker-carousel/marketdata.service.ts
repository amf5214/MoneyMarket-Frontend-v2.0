import axios from "axios";
import Path from "../path.service";
import { ActiveStock } from "./activestock";
import { ApiError } from "../error.service";

export const getMarketStatus = async (cookie:string) => {
    const response = await axios.get(`${Path.API_BASE}/stockdata/market-status`,
    {
        headers: {'content-type': "application/json", 'Authorization': 'Bearer ' + cookie },
    });
    return await response.data;
}

export const getWLAStocks = async (cookie:string) => {
    try {
        const response:any = await axios.get(`${Path.API_BASE}/stockdata/winners-losers`,
        {
            headers: { 'Authorization': 'Bearer ' + cookie },
        });

        const mostActive:ActiveStock[] = [];
        const activeStocks:ActiveStock[] = [];
        const topGainers:ActiveStock[] = [];
        const topLosers:ActiveStock[] = [];

        await response.data.top_gainers.forEach((item:any) => {
            mostActive.push(new ActiveStock(item.ticker, item.price, item.change_amount, item.change_percentage, item.volume));
            topGainers.push(new ActiveStock(item.ticker, item.price, item.change_amount, item.change_percentage, item.volume));

        })

        await response.data.most_actively_traded.forEach((item:any) => {
            mostActive.push(new ActiveStock(item.ticker, item.price, item.change_amount, item.change_percentage, item.volume));
            activeStocks.push(new ActiveStock(item.ticker, item.price, item.change_amount, item.change_percentage, item.volume));
        })

        await response.data.top_losers.forEach((item:any) => {
            mostActive.push(new ActiveStock(item.ticker, item.price, item.change_amount, item.change_percentage, item.volume));
            topLosers.push(new ActiveStock(item.ticker, item.price, item.change_amount, item.change_percentage, item.volume));

        })

        return {
            update_time: await response.last_updated,
            mostActive: mostActive,
            activeStocks: activeStocks,
            topGainers: topGainers,
            topLosers: topLosers
        };
    } catch(err) {
        if(err.response.status === 401) {
            return ApiError.UNAUTHORIZED;
        }
    }
}