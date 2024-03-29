import Path from "../services/path.service"

export const Footer = () => {
    return (
        <>
            <div className="w-full h-1/4 bg-black p-4 flex justify-around">
               <div className="flex flex-col m-3">
                    <p className="text-white text-small text-center hover:underline"><a href={Path.HOME}>Home</a></p>
                    <p className="text-white text-small text-center hover:underline"><a href={Path.ACCOUNT}>Account</a></p>
                    <p className="text-white text-small text-center hover:underline"><a href={Path.SETTINGS}>Settings</a></p>
               </div>
               <div className="flex flex-col m-3">
                    <p className="text-white text-small text-center hover:underline"><a href={Path.LIVE_MARKETS}>Live Markets Home</a></p>
                    <p className="text-white text-small text-center hover:underline"><a href={Path.LIVE_MARKETS_WATCHLIST}>Watch List</a></p>
                    <p className="text-white text-small text-center hover:underline"><a href={Path.MARKET_NEWS}>Market News</a></p>
               </div>
               <div className="flex flex-col m-3">
                    <p className="text-white text-small text-center hover:underline"><a href={Path.LEARNING_HUB}>Learning Hub</a></p>
                    <p className="text-white text-small text-center hover:underline"><a href={Path.CONTENT_HUB}>Content Hub</a></p>
                    <p className="text-white text-small text-center hover:underline"><a href={Path.LEARNING_HUB_COURSE_BOOKMARKS}>Course Bookmarks</a></p>
               </div>
            </div>
        </>
    )
}