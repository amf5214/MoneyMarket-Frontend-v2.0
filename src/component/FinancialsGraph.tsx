import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import ReactApexChart from "react-apexcharts";
import { getStockCashFlow } from "../services/live-markets/financials.service";
import { ApiError } from "../services/error.service";
import { useNavigate } from "react-router-dom";

 interface Props {
   ticker: string;
   height: number;
   width: number
 }

 // Modal to create and display graph of company financial information
 export const FinancialsGraph = ( { ticker, width, height }:Props ) => {

   const navigate = useNavigate();

   // State variable to hold actual data to be graphed. 
   // Object with {x:Date, y:number} objects
   const initState:any[] = [];
   const [financialData, setFinancialData] = useState(initState);

   // Effect to pull data when modal is loaded and store necessary state data
   useEffect(() => {
      const getFinancialData = async () => {
         const cookies = Cookies.get('Authorization') == undefined ? null : Cookies.get('Authorization');
         
         if(cookies != null) {
            const response = await getStockCashFlow(ticker, cookies);
            if(await response == ApiError.UNAUTHORIZED) {
               navigate("/signin")
            } else if (response != ApiError.UNAUTHORIZED && response != undefined) {
               setFinancialData(response.yAxis);
            }
         }
      }

      getFinancialData();
   }, [ticker])

   // State object that stores configuration data for graphs
   const state = {
      series: [{
          data: financialData,
          name: "Net Cash Flow"
      }],
      options: {
          title: {
              text: `${ticker} Net Cash Flow Analysis`,
          },
          plotOptions: {
            bar: {
               colors: {
                 ranges: [{
                   from: -100000000000000,
                   to: 0,
                   color: '#C83250'
                 }, {
                   from: 0,
                   to: 100000000000000,
                   color: '#00C800'
                 }]
               },
               columnWidth: '80%',
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

    // @ts-ignore
     return (
         <>
             {/* @ts-ignore */ }
             <ReactApexChart options={state.options}
                             series={state.series}
                             type={'bar'}
                             height={height * .7}
                             width={width}/>
         </>
    );
 }