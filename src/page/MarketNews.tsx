import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import getNews from "../services/market-news/marketnews.service";
import { NewsStory } from "../services/market-news/newsstory.dto";
import { useNavigate } from "react-router-dom";
import { ApiError } from "../services/error.service";
import Toolbar from "../component/Toolbar";
import "../style/page/marketnews.css"
import { Card, CardBody, CardFooter, CardHeader, Divider, Image } from "@nextui-org/react";
import { Footer } from "../component/Footer";

export const MarketNewsPage = () => {

    const navigate = useNavigate();

    const initNews:NewsStory[] = [];
    const [news, setNews] = useState(initNews);

    useEffect(() => {
        const updateNews = async () => {
            if(Cookies.get("Authorization") != null) {
                // @ts-ignore
                const response = await getNews(Cookies.get("Authorization"));
                if(response != undefined && response != ApiError.UNAUTHORIZED) {
                    setNews(response);
                } else {
                    if(response == ApiError.UNAUTHORIZED) {
                        navigate("/signin");
                    }
                } 
            } else {
                navigate("/signin");
            }
        }
        updateNews();
    }, []);

    return (
        <>
            <Toolbar /> 
            <div className="bg-gray-100 market-news-body">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none">
                        <Card className="bg-slate-800 market-box">
                            <CardHeader className="flex justify-center bg-slate-900">
                                <h2 className="text-2xl font-bold text-white text-center">News</h2>
                            </CardHeader>
                            <Divider className="bg-gray-500" />
                            <CardBody>
                                <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0 bg-slate-800 p-4 rounded-lg gap-y-4">
                                    {news.slice(0, 3).map((story, ind) => (
                                        <Card shadow="sm" key={ind} isPressable onPress={() => window.location.href = story.url}>
                                            <CardHeader className="text-center text-large">
                                                <b className="text-center">{story.title}</b>
                                            </CardHeader>
                                            <Divider />
                                            <CardBody className="overflow-visible p-0 flex justify-center items-center" style={{marginTop: "1rem"}}>
                                                <Image
                                                    shadow="sm"
                                                    radius="lg"
                                                    alt={story.title}
                                                    className="w-full object-center h-[25vh] lg:h-[30vh] md:h-[35vh] w-[60vw] lg:w-[26vw] md:w-[50vw]"
                                                    src={story.image_url}
                                                />
                                            </CardBody>
                                            <CardFooter className="text-small justify-between">
                                                <p>{story.description}</p>
                                            </CardFooter>
                                        </Card>
                                    ))}   
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}