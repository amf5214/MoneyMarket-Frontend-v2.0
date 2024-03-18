import { US_FORMAT, formatDateString, formatDateTimeString } from "../date.service";

export class StockPoint {
    close: number;
    high: number;
    low: number;
    open: number;
    datetime: string;
    volume: number;
    volume_weighted: number;
    transaction_number: number;
    candlestick:any[];
    candlestickVolume:any[];
    eodLine:any[];
    constructor(object:any, hasTime:boolean) {
        this.close = object['c'];
        this.high = object['h'];
        this.low = object['c'];
        this.open = object['o'];
        const dateObj = new Date(object['t']);
        if(hasTime) {
            this.datetime = formatDateTimeString(dateObj);
        } else {
            this.datetime = formatDateString(dateObj, US_FORMAT, '/')
        }
        
        this.volume = object['v'];
        this.volume_weighted = object['vw'];
        this.transaction_number = object['n'];
        this.candlestick = [object['t'], this.open, this.high, this.low, this.close];
        this.candlestickVolume = [object['t'], this.volume];
        this.eodLine = [object['t'], this.close];
    }
}