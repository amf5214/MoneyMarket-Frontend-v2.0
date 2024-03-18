import { Autocomplete, AutocompleteItem, Button, ButtonGroup, Chip, Input, Navbar, NavbarContent, NavbarItem } from "@nextui-org/react"
import { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import Ticker, { FinancialTicker, NewsTicker } from 'nice-react-ticker';
import Cookies from "js-cookie";
import { getMarketStatus, getWLAStocks } from "../services/marketdata.service";
import { ActiveStock } from "../services/activestock";
import "../style/page/livemarkets.css";
import { useAsyncList } from "@react-stately/data";

export const LiveMarketsPage = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const states = ["open", "extended-hours", "closed"];
    const openClass = "bg-green-200 text-green-600";
    const closeClass = "bg-red-200 text-red-600";
    const [nyseState, setNYSEState] = useState("");
    const [nasdaqState, setNasdaqState] = useState("");
    const [otcState, setOTCState] = useState("");

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

    type TickerType = {
        Index: number;
        label: string;
        name: string;
        Symbol: string;
    }

    let list = useAsyncList<TickerType>({
        async load({signal, filterText}) {
            let hintArray:any[] = [];
            await fetch('stocks.json', {signal})
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    // Handle the data here (e.g., set it in component state)
                    hintArray = data['Symbols']
                    hintArray = hintArray.filter((item) => item.Symbol.toLowerCase().includes(filterText?.toLowerCase())).slice(0,15)
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
            return {items: hintArray};
        }
    })

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
                    <Navbar onMenuOpenChange={setIsMenuOpen} isBordered maxWidth="full" className="h-full w-full bg-gray-100 relative flex navheader justify-center">
                        <NavbarContent justify="start" />
                        <NavbarContent className="sm:flex md:flex gap-4 lg:flex justify-center" justify="center">
                                <Autocomplete 
                                    label="Select a stock" 
                                    className="max-w-xs" 
                                    items={list.items}
                                    isLoading={list.isLoading}
                                    onInputChange={list.setFilterText}
                                >
                                    {(item:any) => (
                                        <AutocompleteItem key={item.label}>
                                            {String(item.Symbol)}
                                        </AutocompleteItem>
                                    )}
                                </Autocomplete>
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
            </div>
        </>
    )
}

