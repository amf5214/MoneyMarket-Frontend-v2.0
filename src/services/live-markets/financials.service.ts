import axios from "axios";
import { StockFinancialRecord } from "./FinancialRecord";
import Path from "../path.service";
import { ApiError } from "../error.service";

export const getFinancials = async (ticker:string, cookie:string) => {
    try {
        const response:any = await axios.post(`${Path.API_BASE}/stockdata/financials`,
        {
            tickerName: ticker
        },
        {
            headers: { 'Authorization': 'Bearer ' + cookie },
        });

        const financialRecords:StockFinancialRecord[] = [];

        for(let i = 0; i < await response.data.results.length; i++) {
            if(await response.data.results[i].financials.cash_flow_statement != undefined) {
                financialRecords.push(new StockFinancialRecord(
                    await response.data.results[i].tickers[0],
                    await response.data.results[i].fiscal_year,
                    await response.data.results[i].fiscal_period,
                    await response.data.results[i].financials.cash_flow_statement.net_cash_flow.value,
                    await response.data.results[i].end_date
                ));
            }
            
        }

        return financialRecords;
    } catch(err) {
        if(err.response.status === 401) {
            return ApiError.UNAUTHORIZED;
        }
    }
}

function compare(a:any, b:any) {
    const aTime:Date = new Date(a.x);
    const bTime:Date = new Date(b.x);
    if (aTime < bTime) {
      return -1;
    }
    if (aTime > bTime) {
      return 1;
    }
    return 0;
  }

export const getStockCashFlow = async (ticker:string, cookie:string) => {
    try {
        let returnArray:any[] = [];
        const data:StockFinancialRecord[] = await getFinancials(ticker, cookie);

        for(let i = 0; i < await data.length; i++) {
            returnArray.push({x:data[i].filing_date,y:data[i].netCashFlow});
        }

        const sorted = await returnArray.sort(compare);

        const xAxis:string[] = [];
        const years:number[] = [];

        console.log(sorted);
        await sorted.forEach((item) => {
            years.push(new Date(item.x).getFullYear())
        })

        return {xAxis:xAxis, yAxis:sorted, years: [...new Set(years)]};
    } catch(err) {
        if(err.response.status === 401) {
            return ApiError.UNAUTHORIZED;
        }
    }
}
