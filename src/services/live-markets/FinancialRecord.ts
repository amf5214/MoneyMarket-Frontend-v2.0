export class BalanceSheetRecord {
    current_assets:number;
    current_liabilities:number;
    assets:number;
    liabilities:number;
    equity:number;
    constructor(current_assets:number, current_liabilities:number, assets:number, liabilities:number, equity:number) {
        this.current_assets = current_assets;
        this.current_liabilities = current_liabilities;
        this.assets = assets;
        this.liabilities = liabilities;
        this.equity = equity;
    }
}

export class StockFinancialRecord {
    index:number;
    ticker:string;
    year:number;
    quarter:string;
    netCashFlow:number;
    filing_date:Date;
    balancesheet:BalanceSheetRecord;
    constructor(index:number, ticker:string, year:number, quarter:string, netCashFlow:number, filing_date:Date, balancesheet:BalanceSheetRecord) {
        this.index = index;
        this.ticker = ticker;
        this.year = year;
        this.quarter = quarter;
        this.netCashFlow = netCashFlow;
        this.filing_date = filing_date;
        this.balancesheet = balancesheet;
    }
 }