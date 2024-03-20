import { Autocomplete, AutocompleteItem, Button, ButtonGroup, Chip, Input, Navbar, NavbarContent, NavbarItem } from "@nextui-org/react"
import { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import Ticker, { FinancialTicker, NewsTicker } from 'nice-react-ticker';
import Cookies from "js-cookie";
import { getMarketStatus, getWLAStocks } from "../services/ticker-carousel/marketdata.service";
import { ActiveStock } from "../services/ticker-carousel/activestock";
import "../style/page/livemarkets.css";
import { useAsyncList } from "@react-stately/data";
import { TickerAutocomplete } from "../component/TickerAutocomplete";
import { getStockData } from "../services/live-markets/ticker.service";
import { TickerData } from "../services/live-markets/dto";
import { API_FORMAT, formatDateString } from "../services/date.service";
import { DateTime } from 'luxon';
import { CandlestickGraph } from "../component/CandlestickGraph";
import { FinancialsGraph } from "../component/FinancialsGraph";

// Page to access market data
export const LiveMarketsPage = () => {

    // Array of market state possible values
    const states = ["open", "extended-hours", "closed"];

    // Style classes for market status objects
    const openClass = "bg-green-200 text-green-600";
    const closeClass = "bg-red-200 text-red-600";

    // State variables for status of markets
    const [nyseState, setNYSEState] = useState("");
    const [nasdaqState, setNasdaqState] = useState("");
    const [otcState, setOTCState] = useState("");

    // State variable to array of active stocks that will be shown in the wla ticker feed
    const activeStocks:ActiveStock[] = [];
    const [activeStockArray, setActiveStocksArray] = useState(activeStocks);

    // State variable to store current ticker value
    const [symbol, setSymbol] = useState("");

    // State variable to store start and end date
    let dt:DateTime = DateTime.local();
    dt = dt.minus({'weeks': 4});
    const date:Date = dt.toJSDate();
    const [startDate, setStartDate] = useState(date);
    const [endDate, setEndDate] = useState(new Date());

    // State variable to store aggregation level
    const [timeSpan, setTimeSpan] = useState("day");

    // State variable to store data to be graphed
  // Array of StockPoint objects
  const initialArray:any[] = [];
  const [graphData, setGraphData] = useState(initialArray);

    // Effect that pulls data on market status and updates the state variables
    useEffect(() => {
        const getMarket = async () => {
            try {
                if(Cookies.get('Authorization') != null) {
                    const response = await getMarketStatus(Cookies.get('Authorization'));
                    setNYSEState(await response.exchanges.nyse);
                    setNasdaqState(await response.exchanges.nasdaq);
                    setOTCState(await response.exchanges.otc);
                } 
            }
            catch(err) {
                console.log(err);
            }
        }
        getMarket();
    }, []);

    // Effect to get the wla data and update state variable for array
    useEffect(() => {
        const updateActiveStocks = async () => {
            try {
                if(Cookies.get('Authorization') != null) {
                    setActiveStocksArray(activeStocks);
                    setActiveStocksArray((await getWLAStocks(Cookies.get('Authorization'))).mostActive);
                }
            }
            catch(err) {
                console.log(err);
            }
        }
        updateActiveStocks();
    }, [])

    // Handler for stock search
    const handleSearch = async () => {
        try {
            const cookie = Cookies.get("Authorization");
            const testDto = new TickerData(symbol, timeSpan, formatDateString(startDate, API_FORMAT, "-", 1), formatDateString(endDate, API_FORMAT, "-", 1), '5000');
            if(cookie != undefined) {
                const response = await getStockData(testDto, cookie);
                setGraphData(response);
            }
        }
        
        catch(err) {
            console.log(err);
        }
        
    }

    return (
        <>
            <div className="container-lg flex flex-col w-full justify-start bg-gray-100 market-news-body" >
                <div className="mx-auto w-full" style={{height: "4.5rem"}}>
                    <div style={{height: "100%"}}>
                        <Ticker slideSpeed={100}>
                            { activeStockArray.map((item, idx) => (
                                <FinancialTicker id={idx} key={idx} change={item.changeAmount > 0} symbol={item.ticker} lastPrice={`${Math.round(item.price)}`} percentage={item.changeAmount > 0 ? item.changePercentage: item.changePercentage.substring(1)} currentPrice={`${item.price}`} />
                            ))}
                        </Ticker>
                    </div> 
                </div>
                <ButtonGroup className="" style={{ alignSelf: "flex-end" }}>
                    <Button  className={nyseState == states[2] ? closeClass : openClass}>NYSE is {nyseState}</Button>
                    <Button  className={nasdaqState == states[2] ? closeClass : openClass}>Nasdaq is {nasdaqState}</Button>
                    <Button  className={otcState == states[2] ? closeClass : openClass}>OTC is {otcState}</Button>
                </ButtonGroup>
                <Navbar maxWidth="full" className="hidden md:flex w-full bg-gray-100 relative navheader justify-center" style={{margin: "1rem 0 auto"}}>
                    <NavbarContent justify="start" />
                    <NavbarContent className="sm:flex md:flex gap-4 lg:flex justify-center" justify="center">
                        <TickerAutocomplete setSymbol={setSymbol} />
                        <Button color={"primary"} onClick={handleSearch} >
                            Search
                        </Button>
                    </NavbarContent>
                    <NavbarContent justify="end" />
                </Navbar>
                <div className="container-lg mx-auto w-full flex lg:flex-row md:flex-row sm:flex-col xs:flex-col justify-center items-center" style={{marginTop: "2rem"}}>
                    {graphData.length != 0 ?
                        <div className="container mx-auto flex sm:w-max-[100%] md:w-max-[40%] lg:w-max-[40%] flex-col justify-center items-center">
                            <CandlestickGraph data={graphData} dates={[startDate, endDate]} symbol={symbol} height={280} width={660} />
                        </div>
                    : null
                    }
                    {graphData.length != 0 ?
                        <div className="container mx-auto flex sm:w-max-[100%] md:w-max-[40%] lg:w-max-[40%] flex-col justify-center items-center">
                            <FinancialsGraph ticker={symbol} height={660} width={660} />
                        </div>
                    : null
                    }
                    
                </div>
            </div>
        </>
    )
}

