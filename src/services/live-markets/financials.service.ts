import axios from "axios";
import { BalanceSheetRecord, StockFinancialRecord } from "./FinancialRecord";
import Path from "../path.service";
import { ApiError } from "../error.service";

function financialCompare(a:StockFinancialRecord, b:StockFinancialRecord) {
    const aTime:Date = a.filing_date 
    const bTime:Date = b.filing_date;
    if (aTime < bTime) {
      return -1;
    }
    if (aTime > bTime) {
      return 1;
    }
    return 0;
  }

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
                    i,
                    await response.data.results[i].tickers[0],
                    await response.data.results[i].fiscal_year,
                    await response.data.results[i].fiscal_period,
                    await response.data.results[i].financials.cash_flow_statement.net_cash_flow.value,
                    await response.data.results[i].end_date,
                    new BalanceSheetRecord(
                        await response.data.results[i].financials.balance_sheet.current_assets.value, 
                        await response.data.results[i].financials.balance_sheet.current_liabilities.value, 
                        await response.data.results[i].financials.balance_sheet.assets.value, 
                        await response.data.results[i].financials.balance_sheet.liabilities.value, 
                        await response.data.results[i].financials.balance_sheet.equity.value
                    )
                ));
            }
            
        }

        return financialRecords.sort(financialCompare);
    } catch(err) {
        if(err.response.status === 401) {
            return ApiError.UNAUTHORIZED;
        }
    }
}

type Point = {
    x:Date;
    y:number;
}

export const getStockCashFlow = async (ticker:string, cookie:string) => {
    const returnArray:Point[] = [];
    const years:number[] = [];
    let data:any = await getFinancials(ticker, cookie);

    if(data == ApiError.UNAUTHORIZED) {
        return data;
    } 

    for(let i = 0; i < await data.length; i++) {
        returnArray.push({x:data[i].filing_date,y:data[i].netCashFlow});
        years.push(data[i].year)
    }

    return {yAxis:returnArray, years: [...new Set(years)]};
    
}

    const years:number[] = [];

    returnArray.forEach((item) => {
        years.push(new Date(item.x).getFullYear())
    })

    return {yAxis:returnArray, years: [...new Set(years)]};
    
}
