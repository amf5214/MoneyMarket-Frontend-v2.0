import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import ReactApexChart from "react-apexcharts";
import { Modal } from "react-bootstrap";
import { DateTime } from 'luxon';
import { getBalanceSheet, getStockCashFlow } from "../services/live-markets/financials.service";
import { Api } from "@mui/icons-material";
import { ApiError } from "../services/error.service";
import { useNavigate } from "react-router-dom";

 interface Props {
   ticker: string;
   height: number;
   width: number
 }

 export const BalanceSheetGraph = ( { ticker, width, height }:Props ) => {
    
    const navigate = useNavigate();

    // State variable to hold actual data to be graphed. 
    // Object with {x:Date, y:number} objects
    const initState:any[] = [];
    const [assetData, setAssetData] = useState(initState);
    const [liabilitiesData, setLiabilitiesData] = useState(initState);
    const [equityData, setEquityData] = useState(initState);

    // Effect to pull data when modal is loaded and store necessary state data
    useEffect(() => {
        const getFinancialData = async () => {
            const cookies = Cookies.get('Authorization') == undefined ? null : Cookies.get('Authorization');
            
            if(cookies != null) {
                const response = await getBalanceSheet(ticker, cookies);
                if(await response == ApiError.UNAUTHORIZED) {
                    navigate("/signin")
                } else if (response != ApiError.UNAUTHORIZED && response != undefined) {
                    setAssetData(await response.assets);
                    setLiabilitiesData(await response.liabilities);
                    setEquityData(await response.equity);
                    console.log({assets: assetData, liabilities: liabilitiesData, equity: equityData});
                }
            }
        }

        getFinancialData();
    }, [ticker]);

    // State object that stores configuration data for graphs
    const state = { 
        series: [{
            data: assetData,
            group: "LeftSide",
            name: "Asset"
        }, {
            data: liabilitiesData,
            group: "RightSide",
            name: "Liabilities"
        }, {
            data: equityData,
            group: "RightSide",
            name: "Equity"
        }],
        options: {
            chart: {
                stacked: true
            },
            title: {
                text: `${ticker} Assets`,
                align: 'left'
            },
            plotOptions: {
            bar: {
                columnWidth: '80%'
            }
            },
            xaxis: {
            type: 'category',
            offsetY: 10,
        },
        yaxis: {
            tooltip: {
                enabled: false
            },
            labels: {
                formatter: (value:string) => { 
                    const label:number = Number(value);
                    return `$${label / 1000000}M`
                }
            }
            },
            dataLabels: {
            enabled: false
            },
            
        }
    }

    return (
        <>
           <ReactApexChart options={state.options} series={state.series} type={'bar'} height={height*.7} width={width} />
        </>
   );
 }