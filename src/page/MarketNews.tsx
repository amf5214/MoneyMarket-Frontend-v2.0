import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import getNews from "../services/marketnews.service";
import { NewsStory } from "../services/newsstory.dto";

export const MarketNewsPage = () => {

    const initNews:NewsStory[] = [];
    const [news, setNews] = useState(initNews);

    useEffect(() => {
        const updateNews = async () => {
            if(Cookies.get("Authorization") != null) {
                setNews(await getNews(Cookies.get("Authorization")));
            }
        }
        updateNews();
    }, []);

    return (
        <div className="bg-gray-100 market-news-body">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none">
                    <h2 className="text-2xl font-bold text-gray-900">News</h2>
                    <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
                        {news.slice(0, 3).map((story) => (
                            <div className="group relative">
                                <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                                    <img src={story.image_url} alt={story.title} className="h-full w-full object-cover object-center" />
                                </div>
                                <h3 className="mt-6 text-sm text-gray-500">
                                    <a href={story.url} >
                                    <span className="absolute inset-0"></span>
                                    {story.title}
                                    </a>
                                </h3>
                                <p className="text-base font-semibold text-gray-900">{story.description}</p>
                            </div> 
                        ))}
                        
                    </div>
                </div>
            </div>
        </div>

    );
}