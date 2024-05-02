import { Button, Link } from "@nextui-org/react";
import Path from "../services/path.service";
import "../style/component/footer.css";
import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';


export const Footer = () => {
    const [showFooter, setShowFooter] = useState(false);
    return (
        <>
        {!showFooter ?
            <div className="w-full h-1/4 footer-wrapper">
                <Button className="w-full bg-white" onClick={_e => setShowFooter(true)}>
                    <MenuIcon />
                </Button>
            </div>
        :
            <div className="w-full h-1/4 footer-wrapper">
                <div className="w-full h-1/4 bg-white flex flex-col content-center items-center justify-center p-4">
                    <Button className="bg-transparent text-black" onClick={_e => setShowFooter(false)} style={{alignSelf: "flex-start"}}>
                        <CloseIcon />
                    </Button>
                    <div className="w-full p-4 bg-transparent flex justify-around">
                        <div className="flex flex-col content-center items-center">
                                <Link className="text-small text-black text-center hover:underline" href={Path.HOME}>Home</Link>
                                <Link className="text-small text-black text-center hover:underline" href={Path.ACCOUNT}>Account</Link>
                                <Link className="text-small text-black text-center hover:underline" href={Path.SETTINGS}>Settings</Link>
                        </div>
                        <div className="flex flex-col content-center items-center">
                                <Link className="text-small text-black text-center hover:underline" href={Path.LIVE_MARKETS}>Live Markets Home</Link>
                                <Link className="text-small text-black text-center hover:underline" href={Path.LIVE_MARKETS_WATCHLIST}>Watch List</Link>
                                <Link className="text-small text-black text-center hover:underline" href={Path.MARKET_NEWS}>Market News</Link>
                        </div>
                        <div className="flex flex-col content-center items-center">
                                <Link className="text-small text-black text-center hover:underline" href={Path.LEARNING_HUB}>Learning Hub</Link>
                                <Link className="text-small text-black text-center hover:underline" href={Path.CONTENT_HUB}>Content Hub</Link>
                                <Link className="text-small text-black text-center hover:underline" href={Path.LEARNING_HUB_COURSE_BOOKMARKS}>Course Bookmarks</Link>
                        </div>
                    </div>
                </div>
            </div>
        }
        </>
    )
}