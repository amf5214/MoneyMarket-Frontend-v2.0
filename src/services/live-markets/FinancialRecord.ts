export class StockFinancialRecord {
    ticker:string;
    year:number;
    quarter:string;
    netCashFlow:number;
    filing_date:Date;
    constructor(ticker:string, year:number, quarter:string, netCashFlow:number, filing_date:Date) {
        this.ticker = ticker;
        this.year = year;
        this.quarter = quarter;
        this.netCashFlow = netCashFlow;
        this.filing_date = filing_date;
    }
 }