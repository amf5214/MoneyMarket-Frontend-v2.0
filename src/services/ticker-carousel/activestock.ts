export class ActiveStock {
    ticker:string;
    price:number;
    changeAmount:number;
    changePercentage:string;
    volume:number;
    constructor(ticker:string, price:number, changeAmount:number, change:string, volume:number) {
        this.ticker = ticker;
        this.price = price;
        this.changeAmount = changeAmount;
        this.changePercentage = change;
        this.volume = volume;
    }

}