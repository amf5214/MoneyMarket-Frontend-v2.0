import Path from "../services/path.service"

export const Footer = () => {
    return (
        <>
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
        </>
    )
}