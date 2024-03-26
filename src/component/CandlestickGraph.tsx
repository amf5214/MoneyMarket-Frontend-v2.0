import ReactApexChart from 'react-apexcharts';
import { StockPoint } from '../services/live-markets/StockPoint';
import { US_FORMAT, formatDateString } from '../services/date.service';

interface CandlestickProps {
    data:StockPoint[];
    height:number;
    width:number;
    symbol:string;
    dates:Date[];
}

// Graph to populate a candlestick and a volume graph that are connected via candle id
export const CandlestickGraph = ( { data, height, width, symbol, dates }:CandlestickProps ) => {
    // Deconstruct data passed into array of tohlc (time, open, high, low, close) arrays
    const dataPoints:any[] = [];
    const volumePoints:any[] = [];
    data.forEach((item) => {
        dataPoints.push(item.candlestick);
        volumePoints.push(item.candlestickVolume);
    })

    // State array used to store graph configuration data for the candlestick and volume graphs
    const state = { 
        series: [{data: dataPoints}],
        options: {
            chart: {
                type: 'candlestick',
                height: 350,
                id: 'candles',
            },
            title: {
                text: `${symbol} Share Price Graph [${formatDateString(dates[0], US_FORMAT, '-', 1)} - ${formatDateString(dates[1], US_FORMAT, '-', 1)}]`,
                align: 'left'
            },
            xaxis: {
                type: 'datetime'
            },
            yaxis: {
                tooltip: {
                enabled: true
                }
            }
        },
        seriesBar: [{
            name: 'volume',
            data: volumePoints
        }],
        optionsBar: {
            chart: {
              height: 160,
              type: 'bar',
              brush: {
                enabled: true,
                target: 'candles'
              },
              title: {
                text: 'Volume',
                align: 'left'
              },
              selection: {
                enabled: true,
                xaxis: {
                    type: 'datetime'
                },
                fill: {
                  color: '#ccc',
                  opacity: 0.4
                },
                stroke: {
                  color: '#0D47A1',
                }
              },
            },
            dataLabels: {
              enabled: false
            },
            plotOptions: {
              bar: {
                columnWidth: '80%',
                colors: {
                  ranges: [{
                    from: -1000,
                    to: 0,
                    color: '#F15B46'
                  }, {
                    from: 1,
                    to: 10000,
                    color: '#FEB019'
                  }],
            
                },
              }
            },
            stroke: {
              width: 0
            },
            xaxis: {
              type: 'datetime',
              axisBorder: {
                offsetX: 13
              }
            },
            yaxis: {
              labels: {
                show: true
              }
            }
          }
    };
    
    return (
        <>
            <ReactApexChart options={state.options} series={state.series} type="candlestick" height={height*.5} width={width}/>
            <ReactApexChart options={state.optionsBar} series={state.seriesBar} type="bar" height={height*.3} width={width} />
        </>
    )
    
}