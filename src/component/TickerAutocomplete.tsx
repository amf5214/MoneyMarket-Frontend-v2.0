import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { useAsyncList } from "@react-stately/data";
import SearchIcon from '@mui/icons-material/Search';

interface Props {
    setSymbol:(text:string) => void;
    onClose: () => void;
}

export const TickerAutocomplete = ( { setSymbol, onClose }:Props ) => {

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
            try {
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
            catch(err) {
                if( err instanceof DOMException) {
                    return {items: []};
                } else {
                    console.log(err);
                    return {items: []};
                }
            }
        }
    })

    return (
        <Autocomplete 
            label="Search a stock" 
            className="max-w-xs" 
            items={list.items}
            isLoading={list.isLoading}
            startContent={<SearchIcon />}
            onInputChange={handleChange}
            onBlur={onClose}
        >
            {(item:any) => (
                <AutocompleteItem key={item.label}>
                    {String(item.Symbol)}
                </AutocompleteItem>
            )}
        </Autocomplete>
    )
}