import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react"
import { StockFinancialRecord } from "../services/live-markets/FinancialRecord";
import { useEffect, useState } from "react";
import { getFinancials } from "../services/live-markets/financials.service";
import Cookies from "js-cookie";
import { ApiError } from "../services/error.service";
import { useNavigate } from "react-router-dom";

interface Props {
    ticker:string;
    height:number;
    width:number;
}

export const StockFinancialTable = ( { ticker, width, height }:Props ) => {

    const navigate = useNavigate();

    const initArray:StockFinancialRecord[] = [];
    const [tableData, setTableData] = useState(initArray);

    const formatCash = (x:number) => Intl.NumberFormat('en-US', {
        notation: "compact",
        maximumFractionDigits: 1
      }).format(x);

    useEffect(() => {
        const updateData = async () => {
            const cookie = Cookies.get("Authorization");
            if(cookie != undefined && cookie != null) {
                const data = await getFinancials(ticker, cookie);
                if(data != ApiError.UNAUTHORIZED && data != undefined) {
                    console.log(data);
                    setTableData(data);
                }
                
            }
            
        }
        updateData();
        console.log(tableData);
    }, []);

    return (
        <>
            {tableData.length != 0 ?
                <Table removeWrapper aria-label="financials-table" style={{height:height*.7, width:width}}>
                    <TableHeader>
                        <TableColumn>Year</TableColumn>
                        <TableColumn>Quarter</TableColumn>
                        <TableColumn>Assets</TableColumn>
                        <TableColumn>Liabilities</TableColumn>
                        <TableColumn>Equity</TableColumn>
                    </TableHeader>
                    <TableBody items={tableData}>
                        {(item) => (
                            <TableRow key={item.ticker + "_" + item.index}>
                                <TableCell>{item.year}</TableCell>
                                <TableCell>{item.quarter}</TableCell>
                                <TableCell>{formatCash(item.balancesheet.assets)}</TableCell>
                                <TableCell>{formatCash(item.balancesheet.liabilities)}</TableCell>
                                <TableCell>{formatCash(item.balancesheet.equity)}</TableCell>
                            </TableRow>
                        )}                    
                    </TableBody>
                </Table>
            : null }
        
        </>
    )
}