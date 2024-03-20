import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { useAsyncList } from "@react-stately/data";

interface Props {
    setSymbol:(text:string) => void;
}

export const TickerAutocomplete = ( { setSymbol }:Props ) => {

    const handleChange = (text:string) => {
        list.setFilterText(text);
        setSymbol(text);
    }

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
        <Autocomplete 
            label="Select a stock" 
            className="max-w-xs" 
            items={list.items}
            isLoading={list.isLoading}
            onInputChange={handleChange}
        >
            {(item:any) => (
                <AutocompleteItem key={item.label}>
                    {String(item.Symbol)}
                </AutocompleteItem>
            )}
        </Autocomplete>
    )
}