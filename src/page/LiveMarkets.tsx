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

    // Effect that pulls data on market status and updates the state variables
    useEffect(() => {
        const getMarket = async () => {
            if(Cookies.get('Authorization') != null) {
                const response = await getMarketStatus(Cookies.get('Authorization'));
                setNYSEState(await response.exchanges.nyse);
                setNasdaqState(await response.exchanges.nasdaq);
                setOTCState(await response.exchanges.otc);
            }
        }
        getMarket();
    }, []);

    useEffect(() => {
        const updateActiveStocks = async () => {
            if(Cookies.get('Authorization') != null) {
                setActiveStocksArray(activeStocks);
                setActiveStocksArray((await getWLAStocks(Cookies.get('Authorization'))).mostActive);
            }
        }
        updateActiveStocks();
    }, [])

    return (
        <>
            <div className="bg-gray-100 market-news-body" style={{height: "90vh"}}>
                <div className="mx-auto w-full" style={{height: "4.5rem"}}>
                    <div style={{height: "100%"}}>
                        <Ticker slideSpeed={100}>
                            { activeStockArray.map((item, idx) => (
                                <FinancialTicker id={idx} key={idx} change={item.changeAmount > 0} symbol={item.ticker} lastPrice={`${Math.round(item.price)}`} percentage={item.changeAmount > 0 ? item.changePercentage: item.changePercentage.substring(1)} currentPrice={`${item.price}`} />
                            ))}
                        </Ticker>
                    </div> 
                    <Navbar isBordered maxWidth="full" className="h-full w-full bg-gray-100 relative flex navheader justify-center">
                        <NavbarContent justify="start" />
                        <NavbarContent className="sm:flex md:flex gap-4 lg:flex justify-center" justify="center">
                            <TickerAutocomplete />
                        </NavbarContent>
                        <NavbarContent justify="end">
                            <ButtonGroup className="">
                                <Button  className={nyseState == states[2] ? closeClass : openClass}>NYSE is {nyseState}</Button>
                                <Button  className={nasdaqState == states[2] ? closeClass : openClass}>Nasdaq is {nasdaqState}</Button>
                                <Button  className={otcState == states[2] ? closeClass : openClass}>OTC is {otcState}</Button>
                            </ButtonGroup>
                        </NavbarContent>
                    </Navbar>
                </div>
                <div className="mx-auto w-full h-full flex flex-row sm:flex-col">
                        
                </div>
            </div>
        </>
    )
}

