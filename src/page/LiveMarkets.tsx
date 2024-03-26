import { Autocomplete, AutocompleteItem, Button, ButtonGroup, Card, CardBody, Chip, Divider, Input, Navbar, NavbarContent, NavbarItem, Skeleton } from "@nextui-org/react"
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
import { getTickerDetails } from "../services/live-markets/tickerdetails.service";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { ApiError } from "../services/error.service";
import Toolbar from "../component/Toolbar";
import { useWindowSize } from "../hook/size.hook";
import Path from "../services/path.service";

// Page to access market data
export const LiveMarketsPage = () => {

    const navigate = useNavigate();

    // Array of market state possible values
    const states = ["open", "extended-hours", "closed"];

    // Style classes for market status objects
    const openClass = "bg-green-200 text-green-600";
    const closeClass = "bg-red-200 text-red-600";

    // State variables for status of markets
    const [nyseState, setNYSEState] = useState("");
    const [nasdaqState, setNasdaqState] = useState("");
    const [otcState, setOTCState] = useState("");

    useEffect(() => {
        if(nyseState == states[1]) {
            setNYSEState("in extended");
        }

        if(nasdaqState == states[1]) {
            setNasdaqState("in extended");
        }

        if(otcState == states[1]) {
            setOTCState("in extended");
        }
    }, [nyseState, nasdaqState, otcState])

    // State variable to array of active stocks that will be shown in the wla ticker feed
    const activeStocks:ActiveStock[] = [];
    const [activeStockArray, setActiveStocksArray] = useState(activeStocks);

    // State variable to store current ticker value
    const {ticker} = useParams();
    const [symbol, setSymbol] = useState(ticker != undefined ? ticker : "AMZN");

    useEffect(() => {
        if(ticker == undefined || ticker == "") {
            navigate(Path.LIVE_MARKETS + "/AMZN");
            setSymbol("AMZN");
        } else {
            setSymbol(ticker);
        }
    }, [ticker]);

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

    // State variable for ticker details
    const initialObject:any = {};
    const [tickerDetails, setTickerDetails] = useState(initialObject);

    const [displaySymbol, setDisplaySymbol] = useState("");

    // Effect that pulls data on market status and updates the state variables
    useEffect(() => {
        const getMarket = async () => {
            try {
                if(Cookies.get('Authorization') != null) {
                    const response = await getMarketStatus(Cookies.get('Authorization'));
                    if(response != undefined && response != ApiError.UNAUTHORIZED) {
                        setNYSEState(await response.exchanges.nyse);
                        setNasdaqState(await response.exchanges.nasdaq);
                        setOTCState(await response.exchanges.otc);
                    } else {
                        if(response == ApiError.UNAUTHORIZED) {
                            navigate("/signin")
                        }
                    }
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
                    const response = await getWLAStocks(Cookies.get('Authorization'));
                    if(response != undefined && response != ApiError.UNAUTHORIZED) {
                        setActiveStocksArray(response.mostActive);
                    } else {
                        if(response == ApiError.UNAUTHORIZED) {
                            navigate("/signin");
                        }
                    }
                    
                }
            }
            catch(err) {
                console.log(err);
            }
        }
        updateActiveStocks();
    }, [])

    // Handler for stock search
    const handleSearch = async (givenStartDate?:Date, span?:string) => {
        try {
            const cookie = Cookies.get("Authorization");
            let testDto:TickerData;
            if(givenStartDate != undefined && span != undefined) {
                testDto = new TickerData(symbol, span, formatDateString(givenStartDate, API_FORMAT, "-", 1), formatDateString(endDate, API_FORMAT, "-", 1), '5000');
            } else {
                testDto = new TickerData(symbol, timeSpan, formatDateString(startDate, API_FORMAT, "-", 1), formatDateString(endDate, API_FORMAT, "-", 1), '5000');
            }
            if(cookie != undefined && testDto != undefined) {
                const response = await getStockData(testDto, cookie);
                if(response != undefined && response != ApiError.UNAUTHORIZED) {
                    setGraphData(await response);
                    setDisplaySymbol(symbol);
                } else {
                    if(response == ApiError.UNAUTHORIZED) {
                        navigate("/signin");
                    }
                }
                
            }
        }
        
        catch(err) {
            console.log(err);
        }
        
    }

    useEffect(() => {
        handleSearch();
    },[symbol])

    // Update ticker details
    useEffect(() => {
        const updateTickerDetials = async () =>{
            const cookie = Cookies.get("Authorization");
            if(cookie != undefined) {
                try {
                    const details = await getTickerDetails(symbol, cookie);
                    if(details != undefined && details != ApiError.UNAUTHORIZED) {
                        const info = (await details).results;
                        setTickerDetails({
                            ticker: await info.ticker,
                            name: await info.name,
                            market_cap: await info.market_cap,
                            description: await info.description
                        });
                    } else {
                        if(details == ApiError.UNAUTHORIZED) {
                            navigate("/signin");
                        }
                    }
                }
                catch(err) {
                    console.log(err);
                }
            }
        }

        updateTickerDetials();
    }, [graphData]);

    const handleDaySpan = async () => {
        let dt:DateTime = DateTime.local();
        dt = dt.minus({'days': 1});
        const date:Date = dt.toJSDate();
        setStartDate(date);
        setTimeSpan('hour');
        const span = 'hour';
        await handleSearch(date, span);
    }
    
    const handleWeekSpan = async () => {
        let dt:DateTime = DateTime.local();
        dt = dt.minus({'weeks': 1});
        const date:Date = dt.toJSDate();
        setStartDate(date);
        setTimeSpan('day');
        const span = 'day';
        await handleSearch(date, span);
    }
    
    const handleMonthSpan = async () => {
        let dt:DateTime = DateTime.local();
        dt = dt.minus({'months': 1});
        const date:Date = dt.toJSDate();
        setStartDate(date);
        setTimeSpan('day');
        const span = 'day';
        await handleSearch(date, span);
    }

    const handleQuarterSpan = async () => {
        let dt:DateTime = DateTime.local();
        dt = dt.minus({'months': 3});
        const date:Date = dt.toJSDate();
        setStartDate(date);
        setTimeSpan('week');
        const span = 'week';
        await handleSearch(date, span);
    }

    const handleYearSpan = async () => {
        let dt:DateTime = DateTime.local();
        dt = dt.minus({'years': 1});
        const date:Date = dt.toJSDate();
        setStartDate(date);
        setTimeSpan('month');
        const span = 'month';
        await handleSearch(date, span);
    }

    const [width, height] = useWindowSize();
    const [graphSize, setGraphSize] = useState([width, height]);
    useEffect(() => {
        let newWidth = width;
        if(width >= 1024) {
            newWidth = width * 0.4;
        } else {
            newWidth = width * 0.8;
        }
        let newHeight = height;
        
        newHeight = height * 0.8;
        
        console.log([newWidth, newHeight]);

        setGraphSize([newWidth, newHeight]);
    }, [width, height]);

    return (
        <>
            <Toolbar />
            <div className="container-lg flex flex-col w-full justify-center items-center bg-gray-100 market-news-body live-markets-sub min-h-[90vh]">
                <div className="mx-auto w-full" style={{height: "4.5rem"}}>
                    <div style={{height: "100%"}}>
                        <Ticker slideSpeed={100}>
                            { activeStockArray.map((item, idx) => (
                                <FinancialTicker id={idx} key={idx} change={item.changeAmount > 0} symbol={item.ticker} lastPrice={`${Number.parseFloat(`${item.price - item.changeAmount}`).toFixed(2)}`} percentage={item.changeAmount > 0 ? item.changePercentage: item.changePercentage.substring(1)} currentPrice={`${Number.parseFloat(`${item.price}`).toFixed(2)}`} />
                            ))}
                        </Ticker>
                    </div> 
                </div>
                
                <Navbar maxWidth="full" className="flex w-[92vw] relative navheader justify-center" style={{margin: "1rem 0 auto", zIndex: 0, background: "transparent", backdropFilter: "none"}}>
                    {graphData.length != 0 ?
                        <NavbarContent className="hidden md:flex" justify="center">          
                                <ButtonGroup>
                                    <Button  className={nyseState == states[2] ? closeClass : openClass}>NYSE is {nyseState}</Button>
                                    <Button  className={nasdaqState == states[2] ? closeClass : openClass}>Nasdaq is {nasdaqState}</Button>
                                    <Button  className={otcState == states[2] ? closeClass : openClass}>OTC is {otcState}</Button>
                                </ButtonGroup>
                            
                        </NavbarContent>
                    : null }
                    
                </Navbar>

                {graphData.length != 0 ?
                    <div className="container-lg mx-auto grid grid-cols-2 gap-x-4 gap-y-4" style={{ color: "white", paddingBottom: "2rem", marginLeft: "2rem", marginRight: "2rem", marginBottom: "2rem", borderRadius: "1rem" }}>
                        <div className="container-lg mx-auto flex flex-col justify-center items-center col-span-2" style={{margin: "1rem"}} >
                            <Card className="w-[89vw]" style={{border: "3px white solid", color: "white", filter: "drop-shadow(5px 5px 5px)", backgroundColor: "#038C3E"}}>
                                <CardBody>
                                    <figure>
                                        <h1 className="text-center">{ tickerDetails.ticker }</h1>
                                    </figure>
                                    <figure>
                                        <h1 className="text-center">{ tickerDetails.name }</h1>
                                    </figure>
                                </CardBody>
                            </Card>
                        </div>

                        <div className="container-lg mx-auto flex flex-col justify-center items-center col-span-2 lg:col-span-1">
                            <ButtonGroup style={{alignSelf: "flex-start", background: "transparent", color: "white"}}>
                                <Button onClick={handleDaySpan} id="candlestick-button">Day</Button>
                                <Button onClick={handleWeekSpan} id="candlestick-button">Week</Button>
                                <Button onClick={handleMonthSpan} id="candlestick-button">Month</Button>
                                <Button onClick={handleQuarterSpan} id="candlestick-button">Quarter</Button>
                                <Button onClick={handleYearSpan} id="candlestick-button">Year</Button>
                            </ButtonGroup>
                            <Card>
                                <CardBody>
                                    <CandlestickGraph data={graphData} dates={[startDate, endDate]} symbol={displaySymbol} height={graphSize[1]} width={graphSize[0]} />
                                </CardBody>
                            </Card>
                        </div>
                        
                        <div className="container-lg mx-auto flex flex-col justify-center items-center col-span-2 lg:col-span-1">
                            <ButtonGroup style={{alignSelf: "flex-start", background: "transparent", color: "white"}}>
                                <Button id="candlestick-button">Cash Flow</Button>
                                {/* <Button id="candlestick-button">Operating Income</Button>
                                <Button id="candlestick-button">Profit</Button> */}
                            </ButtonGroup>
                            <Card className="h-full flex-col mx-auto flex justify-center items-center">
                                <CardBody className="h-full flex-col mx-auto flex justify-center items-center">
                                    <FinancialsGraph ticker={displaySymbol} height={graphSize[1]} width={graphSize[0]} />
                                </CardBody>
                            </Card>
                        </div>

                    </div>
                    :
                    <div className="container-lg mx-auto grid grid-cols-2 gap-x-4 gap-y-4" style={{ color: "white", paddingBottom: "2rem", marginLeft: "2rem", marginRight: "2rem", marginBottom: "2rem", borderRadius: "1rem" }}>
                        <div className="container-lg mx-auto flex flex-col justify-center items-center col-span-2 lg:col-span-1">
                            <ButtonGroup style={{alignSelf: "flex-start", background: "transparent", color: "white"}}>
                                <Button onClick={handleDaySpan} id="candlestick-button">Day</Button>
                                <Button onClick={handleWeekSpan} id="candlestick-button">Week</Button>
                                <Button onClick={handleMonthSpan} id="candlestick-button">Month</Button>
                                <Button onClick={handleQuarterSpan} id="candlestick-button">Quarter</Button>
                                <Button onClick={handleYearSpan} id="candlestick-button">Year</Button>
                            </ButtonGroup>
                            <Card>
                                <CardBody>
                                    <Skeleton className="rounded-lg min-h-[660] min-w-[700]">
                                        <div className="rounded-lg bg-default-300" style={{height: graphSize[1] * .5, width: graphSize[0]}}></div>
                                    </Skeleton>
                                </CardBody>
                            </Card>
                        </div>
                        
                        <div className="container-lg mx-auto flex flex-col justify-center items-center col-span-2 lg:col-span-1">
                            <ButtonGroup style={{alignSelf: "flex-start", background: "transparent", color: "white"}}>
                                <Button id="candlestick-button">Cash Flow</Button>
                            </ButtonGroup>
                            <Card className="h-full flex-col mx-auto flex justify-center items-center">
                                <CardBody className="h-full flex-col mx-auto flex justify-center items-center">
                                    <Skeleton className="rounded-lg h-[660] w-[700]">
                                        <div className="rounded-lg bg-default-300" style={{height: graphSize[1] * .5, width: graphSize[0]}}></div>
                                    </Skeleton>
                                </CardBody>
                            </Card>
                        </div>

                    </div>
                    }
            </div>
        </>
    )
}
