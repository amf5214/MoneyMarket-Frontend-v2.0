import { Button, ButtonGroup, Chip, Input, Navbar, NavbarContent, NavbarItem } from "@nextui-org/react"
import { useEffect, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import Ticker, { FinancialTicker, NewsTicker } from 'nice-react-ticker';
import Cookies from "js-cookie";
import { getMarketStatus } from "../services/marketdata.service";

export const LiveMarketsPage = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const states = ["open", "extended-hours", "closed"];
    const openClass = "bg-green-200 text-green-600";
    const closeClass = "bg-red-200 text-red-600";
    const [nyseState, setNYSEState] = useState("");
    const [nasdaqState, setNasdaqState] = useState("");
    const [otcState, setOTCState] = useState("");

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
    
    return (
        <>
            <div className="bg-gray-100 market-news-body" style={{height: "90vh"}}>
                <div className="mx-auto max-w-7xl px-4 w-full">
                    <Navbar onMenuOpenChange={setIsMenuOpen} isBordered maxWidth="full" className="h-full w-full bg-gray-100 relative flex navheader justify-center">
                        <NavbarContent justify="start" />
                        <NavbarContent className="md:flex gap-4 lg:flex justify-center" justify="center">
                            <NavbarItem>
                                <Input
                                    classNames={{
                                        base: "max-w-full sm:max-w-[10rem] h-10",
                                        mainWrapper: "h-full",
                                        input: "text-small",
                                        inputWrapper: "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
                                    }}
                                    placeholder="Type to search..."
                                    size="sm"
                                    startContent={<SearchIcon />}
                                    type="search"
                                />
                            </NavbarItem>
                        </NavbarContent>
                        <NavbarContent justify="end">
                            <ButtonGroup className="flex space-x-4">
                                <Chip  className={nyseState == states[2] ? closeClass : openClass}>NYSE is {nyseState}</Chip>
                                <Chip  className={nasdaqState == states[2] ? closeClass : openClass}>Nasdaq is {nasdaqState}</Chip>
                                <Chip  className={otcState == states[2] ? closeClass : openClass}>OTC is {otcState}</Chip>
                            </ButtonGroup>
                        </NavbarContent>
                    </Navbar>
                </div>
            </div>
        </>
    )
}