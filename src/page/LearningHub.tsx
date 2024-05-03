import { Card, CardBody, CardHeader, Divider, Image } from "@nextui-org/react";
import Toolbar from "../component/Toolbar";
import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import Path from "../services/path.service";
import "../style/page/learninghubhome.css"
import { Footer } from "../component/Footer";
import {getLearningHub} from "../services/learning-hub/learninghub.service.ts";
import Cookies from "js-cookie";
import {ApiError} from "../services/error.service.ts";
import PathService from "../services/path.service";
import {LearningSeries} from "../services/learning-hub/LearningSeries.ts";

export const LearningHubPage = () => {

    const navigate = useNavigate();

    const imageUrl = "coverimage.png";

    // State variable to hold current page index of learning series wrapper
    // const [pageIndex, setPageIndex] = useState('1');

    const [homeContent, setHomeContent] = useState<LearningSeries[]>([]);

    // State variable to hold the size of the pagination wrapper
    // const [pages, setPages] = useState(1);

    useEffect(() => {
        const getHome = async () => {
            const cookie: string | undefined = Cookies.get("Authorization");
            if (cookie != undefined) {
                const response = await getLearningHub(cookie);
                if(response != undefined && response != ApiError.UNAUTHORIZED) {
                    setHomeContent(response);
                } else if(response == ApiError.UNAUTHORIZED) {
                    navigate(PathService.SIGNIN);
                } else {
                    console.log(response);
                }
            }
        }

        getHome();
    }, []);

    return (
        <>
            <Toolbar />
            <div className="w-full h-full flex flex-col items-center justify-center align-center content-center learning-hub-sub">
                <Card className="bg-slate-800 market-box w-3/4 h-2/3 m-8 drop-shadow-lg">
                    <CardHeader className="flex justify-center bg-slate-900">
                        <h2 className="text-2xl font-bold text-white text-center">Learning Hub</h2>
                    </CardHeader>
                    <Divider className="bg-gray-500" />
                    <CardBody>
                            {/*<Tabs selectedKey={pageIndex} disableCursorAnimation={true} disableAnimation={true} isDisabled style={{display: "none"}}>*/}
                            {/*    {Array.from({ length: pages }, (_value, index) => index + 1).map((i) => (*/}
                            {/*        <Tab key={`${i}`}>*/}
                                        <div className="space-y-3 flex flex-col justify-center content-center items-center lg:grid md:grid sm:grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 lg:gap-x-6 md:gap-x-6 sm:gap-x-6 lg:space-y-0 md:space-y-0 sm:space-y-0 bg-slate-800 rounded-lg gap-y-2">     
                                            {Array.from({ length: homeContent.length }, (_value, index) => index).map((ind) => (

                                                <Card className="bg-transparent border-0 hover:bg-slate-900 p-1" shadow="none" isPressable onPress={_e => navigate(Path.LEARNING_SERIES + "/" + homeContent[ind]._id + "?edit=false")}>
                                                    <CardBody>
                                                        <Image
                                                            shadow="sm"
                                                            radius="none"
                                                            alt={homeContent[ind].title}
                                                            className="w-full object-center w-[60vw] h-[25vh] lg:h-[15vh] lg:w-[15vw] md:w-[50vw] md:h-[15vh] sm:h-[15vh]"
                                                            src={homeContent[ind].coverArtId != null ? homeContent[ind].coverArtId : imageUrl}
                                                        />
                                                        <b className="text-lg sm:text-small text-white">{homeContent[ind].title}</b>
                                                        <div className="text-md sm:text-xs text-white">{homeContent[ind].authorName}</div>
                                                    </CardBody>
                                                </Card>
                                            ))}
                                        </div>
                            {/*        </Tab>*/}
                            {/*    ))}*/}
                            {/*</Tabs>*/}
                    </CardBody>
                    {/*<CardFooter className="flex justify-center bg-slate-800 pb-6">*/}
                    {/*    <Pagination */}
                    {/*                showControls */}
                    {/*                loop*/}
                    {/*                showShadow */}
                    {/*                color="primary" */}
                    {/*                key={"pagination"} */}
                    {/*                total={pages} */}
                    {/*                initialPage={1} */}
                    {/*                variant={"flat"} */}
                    {/*                page={Number(pageIndex)}*/}
                    {/*                onChange={page => setPageIndex(String(page))}*/}
                    {/*    />*/}
                    {/*</CardFooter>*/}
                </Card>
            </div>
            <Footer />
        </>
    );
}