export class TickerData {
    tickerName:string;
    timeSpan:string;
    startDate:string;
    endDate:string;
    limit:string;
    constructor(tickerName: string, timeSpan: string, startDate: string, endDate: string, limit: string) {
        this.tickerName = tickerName;
        this.timeSpan = timeSpan;
        this.startDate = startDate;
        this.endDate = endDate;
        this.limit = limit;
    }

}