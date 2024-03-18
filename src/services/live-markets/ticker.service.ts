import axios from "axios";
import Path from "../path.service";
import { StockPoint } from "./StockPoint";
import { TickerData } from "./dto";

const processStockData = (response:any, hasTime:boolean) => {
    const points:StockPoint[] = [];

    response.results.forEach((item:any, idx:number) => {
        points.push(new StockPoint(item, hasTime));
    })

    return points;
}

export const getStockData = async (dto:TickerData, cookie:string) => {
    const response = await axios.post(`${Path.API_BASE}/stockdata/ticker`,
    {
        tickerName: dto.tickerName,
        timeSpan: dto.timeSpan,
        startDate: dto.startDate,
        endDate: dto.endDate,
        limit: dto.limit
    },
    {
        headers: { 'Authorization': 'Bearer ' + cookie },
    });

    const data = await response.data;
    const processed = processStockData(await data, dto.timeSpan == 'hour');
    return processed;
}