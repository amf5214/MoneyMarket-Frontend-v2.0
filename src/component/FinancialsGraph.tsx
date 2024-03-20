import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import ReactApexChart from "react-apexcharts";
import { Modal } from "react-bootstrap";
import { DateTime } from 'luxon';
import { getStockCashFlow } from "../services/live-markets/financials.service";

 interface Props {
   ticker: string;
   height: number;
   width: number
 }

 // Modal to create and display graph of company financial information
 export const FinancialsGraph = ( { ticker, width, height }:Props ) => {

   // State variable to hold actual data to be graphed. 
   // Object with {x:Date, y:number} objects
   const initState:any[] = [];
   const [financialData, setFinancialData] = useState(initState);

   // State variable to hold array of unique years data contains
   // Array of number objects
   const initStateYears:number[] = []
   const [years, setYears] = useState(initStateYears);

   // State variable to hold array of year group objects
   // Array of objects of {title:string, cols:number}
   const initYearGroups:any[] = [];
   const [yearGroups, setYearGroups] = useState(initYearGroups);

   // Effect to pull data when modal is loaded and store necessary state data
   useEffect(() => {
      const getFinancialData = async () => {
         const cookies = Cookies.get('Authorization') == undefined ? null : Cookies.get('Authorization');
         
         if(cookies != null) {
            const response = await getStockCashFlow(ticker, cookies);
            setFinancialData(response.yAxis);
            setYears(response.years)
         }
      }

      getFinancialData();
   }, [])

   // Effect to create the yeargroup objects that create x axis grouping on the graph
   useEffect(() => {
      const lst:any[] = [];
      years.forEach((item:number) => {
         let num:number = 0;
         financialData.forEach((obj, idx) => {
            const date:Date = new Date(obj.x);
            if(date.getFullYear() == item) {
               num++;
            } 
         })
         lst.push({title:item, cols: num});
      })
      setYearGroups(lst);
   }, [financialData])

   // State object that stores configuration data for graphs
   const state = { 
      series: [{
          data: financialData,
          name: "Net Cash Flow"
      }],
      options: {
          title: {
              text: `${ticker} Net Cash Flow Analysis`,
              align: 'left'
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
            labels: {
              formatter: function(val:Date) {
                  const date:Date = new Date(val);
                return " Q" + Math.floor((date.getMonth() + 3) / 3);
              }
            },
            offsetY: 10,
            group: {
               style: {
                 fontSize: '10px',
                 fontWeight: 700
               },
               groups: yearGroups     
             }
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