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

export class IncomeStatementRecord {
    net_income_equity:number;
    net_income:number;
    revenues:number;
    gross_profit:number;
    cost_of_revenue:number;
    constructor(net_income_equity:number, net_income:number, revenues:number, gross_profit:number, cost_of_revenue:number) {
        this.net_income_equity = net_income_equity;
        this.net_income = net_income;
        this.revenues = revenues;
        this.gross_profit = gross_profit;
        this.cost_of_revenue = cost_of_revenue;
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
    incomestatement?:IncomeStatementRecord;
    constructor(index:number, ticker:string, year:number, quarter:string, netCashFlow:number, filing_date:Date, balancesheet:BalanceSheetRecord, incomestatement?:IncomeStatementRecord) {
        this.index = index;
        this.ticker = ticker;
        this.year = year;
        this.quarter = quarter;
        this.netCashFlow = netCashFlow;
        this.filing_date = filing_date;
        this.balancesheet = balancesheet;
        if(incomestatement != undefined) {
            this.incomestatement = incomestatement;
        } else {
            this.incomestatement = undefined;
        }
        
    }
 }