import { Button, Divider, Link } from "@nextui-org/react";
import Path from "../services/path.service";
import "../style/component/footer.css";
import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';


export const Footer = () => {
    const [showFooter, setShowFooter] = useState(false);
    return (
        <>
        {showFooter == false ?
            <div className="w-full h-1/4 footer-wrapper">
                <Button className="w-full bg-slate-900 text-gray-500" onClick={e => setShowFooter(true)}>
                    Footer
                </Button>
            </div>
        :
            <div className="w-full h-1/4 footer-wrapper bg-transparent">
                <div className="w-full h-1/4 bg-slate-900 flex flex-col content-center items-center justify-center p-4">
                    <Button className="bg-transparent text-white" onClick={e => setShowFooter(false)} style={{alignSelf: "flex-start"}}>
                        <CloseIcon />
                    </Button>
                    <h1 className="text-md text-white underline">Links</h1>
                    <div className="w-full p-4 bg-transparent flex justify-around">
                        <div className="flex flex-col">
                                <Link className="text-small hover:underline text-white hover:text-white" href={Path.HOME}>Home</Link>
                                <Link className="text-small hover:underline text-white hover:text-white" href={Path.ACCOUNT}>Account</Link>
                                <Link className="text-small hover:underline text-white hover:text-white" href={Path.SETTINGS}>Settings</Link>
                        </div>
                        <div className="flex flex-col">
                                <Link className="text-small hover:underline text-white hover:text-white" href={Path.LIVE_MARKETS}>Live Markets Home</Link>
                                <Link className="text-small hover:underline text-white hover:text-white" href={Path.LIVE_MARKETS_WATCHLIST}>Watch List</Link>
                                <Link className="text-small hover:underline text-white hover:text-white" href={Path.MARKET_NEWS}>Market News</Link>
                        </div>
                        <div className="flex flex-col">
                                <Link className="text-small hover:underline text-white hover:text-white" href={Path.LEARNING_HUB}>Learning Hub</Link>
                                <Link className="text-small hover:underline text-white hover:text-white" href={Path.CONTENT_HUB}>Content Hub</Link>
                                <Link className="text-small hover:underline text-white hover:text-white" href={Path.LEARNING_HUB_COURSE_BOOKMARKS}>Course Bookmarks</Link>
                        </div>
                    </div>
                </div>
            </div>
        }
        </>
    )
}