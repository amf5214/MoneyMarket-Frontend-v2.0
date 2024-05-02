import { Tab, Tabs } from "@nextui-org/react"
import { StockTable } from "../component/StockTable"
import Toolbar from "../component/Toolbar"
import { ActiveStock } from "../services/ticker-carousel/activestock";
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { ApiError } from "../services/error.service";
import { getWLAStocks } from "../services/ticker-carousel/marketdata.service";
import { useNavigate } from "react-router-dom";
import { Footer } from "../component/Footer";

export const LiveMarketsHomePage = () => {

    const [activeStocks, setActiveStocks] = useState<ActiveStock[]>([]);  
    const [topGainers, setTopGainers] = useState<ActiveStock[]>([]);  
    const [topLosers, setTopLosers] = useState<ActiveStock[]>([]);    

    const navigate = useNavigate();

    // Effect to get the wla data and update state variable for array
    useEffect(() => {
        const updateActiveStocks = async () => {
            try {
                const cookie = Cookies.get('Authorization');
                if(cookie != null) {
                    const response = await getWLAStocks(cookie);
                    if(response != undefined && response != ApiError.UNAUTHORIZED) {
                        setTopGainers(response.topGainers);
                        setTopLosers(response.topLosers);
                        setActiveStocks(response.activeStocks);
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
    }, []);

    return (
        <>
            <Toolbar />
            <div className="w-full flex flex-col justify-center align-bottom items-center live-markets-sub">
                <div className="m-6 p-3 w-[90%] lg:w-[70%] bg-transparent">
                    <Tabs aria-label="Options">
                        <Tab key="mostActive" title="Most Active">
                            <StockTable items={activeStocks}/>
                        </Tab>
                        <Tab key="gainers" title="Gainers">
                            <StockTable items={topGainers}/>
                        </Tab>
                        <Tab key="losers" title="Losers">
                            <StockTable items={topLosers}/>
                        </Tab>
                    </Tabs>
                </div>
            </div>
            <Footer />
        </>
    )
}