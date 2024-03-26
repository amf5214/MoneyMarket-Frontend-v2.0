import { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import getNews from "../services/market-news/marketnews.service";
import { NewsStory } from "../services/market-news/newsstory.dto";
import AuthContext from "../provider/AuthProvider";
import { redirect, useHref, useNavigate } from "react-router-dom";
import { UndoRounded } from "@mui/icons-material";
import { ApiError } from "../services/error.service";
import Toolbar from "../component/Toolbar";
import "../style/page/marketnews.css"
import { Card, CardBody, CardFooter, CardHeader, Divider, Image } from "@nextui-org/react";

export const MarketNewsPage = () => {

    const navigate = useNavigate();

    const initNews:NewsStory[] = [];
    const [news, setNews] = useState(initNews);

    useEffect(() => {
        const updateNews = async () => {
            if(Cookies.get("Authorization") != null) {
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
                        <Card className="bg-slate-800">
                            <CardHeader className="flex justify-center bg-slate-900">
                                <h2 className="text-2xl font-bold text-white text-center">News</h2>
                            </CardHeader>
                            <Divider className="bg-gray-500" />
                            <CardBody>
                                <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0 bg-slate-800 p-4 rounded-lg">
                                    {news.slice(0, 3).map((story, ind) => (
                
                                        <Card shadow="sm" key={ind} isPressable onPress={() => window.location.href = story.url}>
                                            <CardBody className="overflow-visible p-0">
                                                <Image
                                                    shadow="sm"
                                                    radius="lg"
                                                    alt={story.title}
                                                    className="w-full object-cover h-[50vh] w-[100vw] lg:w-[35vw]"
                                                    src={story.image_url}
                                                />
                                            </CardBody>
                                            <CardFooter className="text-small justify-between">
                                                <b>{story.title}</b>
                                            </CardFooter>
                                        </Card>
                                    ))}   
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}