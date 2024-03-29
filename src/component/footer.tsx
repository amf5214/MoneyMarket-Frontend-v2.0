import { Button, Divider, Link } from "@nextui-org/react";
import Path from "../services/path.service";
import "../style/component/footer.css";
import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';


export const Footer = () => {
    const [showFooter, setShowFooter] = useState(false);
    return (
        <>
        {showFooter == false ?
            <div className="w-full h-1/4 footer-wrapper">
                <Button className="w-full text-black" onClick={e => setShowFooter(true)}>
                    <MenuIcon />
                </Button>
            </div>
        :
            <div className="w-full h-1/2 footer-wrapper">
                <div className="w-full flex flex-col content-center items-center justify-center p-4">
                    <Button className="bg-transparent text-white" onClick={e => setShowFooter(false)} style={{alignSelf: "flex-start"}}>
                        <CloseIcon />
                    </Button>                
                </div>
            </div>
        }
        </>
    )
}