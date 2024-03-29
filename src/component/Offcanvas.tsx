import { Button, Card } from "@nextui-org/react";
import { ReactNode } from "react";
import CloseIcon from '@mui/icons-material/Close';

interface Props {
    show:boolean;
    onClose: () => void;
    children: ReactNode;
}

export const Offcanvas = ({ show, onClose, children }:Props) => {
    return (
        <>
        {show ? 
        <div className="absolute right-0 top-0 w-1/3 h-full backdrop-blur-sm z-50">
            <Card className="h-full bg-white border-2 border-black rounded-md flex flex-col">
                <div className="relative min-h-[5vh]">
                    <Button isIconOnly color="primary" onClick={onClose} className="absolute right-1 top-1" style={{height: "40px", width: "40px"}}><CloseIcon /></Button>
                </div>
                {children}
            </Card>
        </div>
        
        : null}
        </>
    ) 
                    
}