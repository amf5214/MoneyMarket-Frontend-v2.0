import { Card, Chip, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react"
import { ActiveStock } from "../services/ticker-carousel/activestock"
import Path from "../services/path.service"

interface Props {
    items: ActiveStock[]
}

export const StockTable = ( { items }:Props ) => {
    return (
        <>
            <Card className="m-4 bg-slate-800">
                <Table removeWrapper aria-label="tickers">
                    <TableHeader>
                        <TableColumn className="bg-slate-900 text-white">Ticker</TableColumn>
                        <TableColumn className="bg-slate-900 text-white">Price</TableColumn>
                        <TableColumn className="bg-slate-900 text-white">Change Percent</TableColumn>
                        <TableColumn className="bg-slate-900 text-white">Volume</TableColumn>
                    </TableHeader>
                    <TableBody items={items}>
                    {(item) => (
                        <TableRow key={item.ticker} href={Path.LIVE_MARKETS + "/" + item.ticker.toUpperCase()} style={{cursor: "pointer"}}>
                            <TableCell key={"ticker_" + item.ticker} className={item.changeAmount > 0 ? "text-green-400" : "text-red-400"}>{item.ticker}</TableCell>
                            <TableCell key={"price_" + item.ticker} className={item.changeAmount > 0 ? "text-green-400" : "text-red-400"}>${item.price}</TableCell>
                            <TableCell key={"changePercent_" + item.ticker}>
                                <Chip color={item.changeAmount > 0 ? "success" : "danger"}>{item.changePercentage}</Chip>
                            </TableCell>
                            <TableCell key={"volume_" + item.ticker} className={item.changeAmount > 0 ? "text-green-400" : "text-red-400"}>{item.volume}</TableCell>
                        </TableRow>
                    )}                    
                    </TableBody>
                </Table>
            </Card>
        </>
    )
}