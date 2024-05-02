import axios from "axios";
import { BalanceSheetRecord, StockFinancialRecord } from "./FinancialRecord";
import Path from "../path.service";
import { ApiError } from "../error.service";

function financialCompare(a:StockFinancialRecord, b:StockFinancialRecord) {
    const aTime:number = a.year + Number.parseFloat(a.quarter.charAt(1)) / 5; 
    const bTime:number = b.year + Number.parseFloat(b.quarter.charAt(1)) / 5; ;
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
            } else {
                financialRecords.push(new StockFinancialRecord(
                    i,
                    await response.data.results[i].tickers[0],
                    await response.data.results[i].fiscal_year,
                    await response.data.results[i].fiscal_period,
                    0,
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
        // @ts-ignore
        if(err.response.status === 401) {
            return ApiError.UNAUTHORIZED;
        }
    }
}

type Point = {
    x:string;
    y:number;
}

export const getStockCashFlow = async (ticker:string, cookie:string) => {
    const returnArray:Point[] = [];
    let data:any = await getFinancials(ticker, cookie);

    if(data == ApiError.UNAUTHORIZED) {
        return data;
    } 

    for(let i = 0; i < await data.length; i++) {
        returnArray.push({x:data[i].year + " " + data[i].quarter,y:data[i].netCashFlow});
    }

    return {yAxis:returnArray};
    
}

export const getBalanceSheet = async (ticker:string, cookie:string) => {
    const assetsArray:Point[] = [];
    const liabilitiesArray:Point[] = [];
    const equityArray:Point[] =[];
    let data:any = await getFinancials(ticker, cookie);

    if(data == ApiError.UNAUTHORIZED) {
        return data;
    } 

    for(let i = 0; i < await data.length; i++) {
        console.log(data[i].year + " " + data[i].quarter);
        assetsArray.push({x:data[i].year + " " + data[i].quarter,y:data[i].balancesheet.assets});
        liabilitiesArray.push({x:data[i].year + " " + data[i].quarter,y:data[i].balancesheet.liabilities});
        equityArray.push({x:data[i].year + " " + data[i].quarter,y:data[i].balancesheet.equity});
    }

    return {
        assets: assetsArray, 
        liabilities: liabilitiesArray, 
        equity: equityArray, 
    };
    
}
