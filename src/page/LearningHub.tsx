import { Card, CardBody, CardHeader, Divider, Image, Pagination, Tab, Tabs } from "@nextui-org/react";
import { CardFooter } from "react-bootstrap";
import Toolbar from "../component/Toolbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Path from "../services/path.service";
import "../style/page/learninghubhome.css"
import { Footer } from "../component/Footer";

export const LearningHubPage = () => {

    const navigate = useNavigate();

    const title = "Complete C# Masterclass";
    const imageUrl = "coverimage.png";
    const authors = "Denis Panjuta, Tutorials.eu by Denis Panjuta";
    const seriesId = 1;

    // State variable to hold current page index of learning series wrapper
    const [pageIndex, setPageIndex] = useState('1');

    // State variable to hold the size of the pagination wrapper
    const [pages] = useState(4);

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
                            <Tabs selectedKey={pageIndex} disableCursorAnimation={true} disableAnimation={true} isDisabled style={{display: "none"}}>
                                {Array.from({ length: pages }, (_value, index) => index + 1).map((i) => (
                                    <Tab key={`${i}`}>
                                        <div className="space-y-3 flex flex-col justify-center content-center items-center lg:grid md:grid sm:grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 lg:gap-x-6 md:gap-x-6 sm:gap-x-6 lg:space-y-0 md:space-y-0 sm:space-y-0 bg-slate-800 rounded-lg gap-y-2">     
                                            {Array.from({ length: 12 }, (_value, index) => index).map((ind) => (

                                                <Card className="bg-transparent border-0 hover:bg-slate-900 p-1" shadow="none" isPressable onPress={_e => navigate(Path.LEARNING_SERIES + "/" + seriesId + "?edit=false")}>
                                                    <CardBody>
                                                        <Image
                                                            shadow="sm"
                                                            radius="none"
                                                            alt={title}
                                                            className="w-full object-center w-[60vw] h-[25vh] lg:h-[15vh] lg:w-[15vw] md:w-[50vw] md:h-[15vh] sm:h-[15vh]"
                                                            src={imageUrl}
                                                        />
                                                        <b className="text-lg sm:text-small text-white">{title}</b>
                                                        <div className="text-md sm:text-xs text-white">{authors}</div>
                                                        <div className="text-md sm:text-xs text-white">{"page " + i + " item " + ind}</div>
                                                    </CardBody>
                                                </Card>
                                            ))}
                                        </div>
                                    </Tab>
                                ))}
                            </Tabs>
                    </CardBody>
                    <CardFooter className="flex justify-center bg-slate-800 pb-6">
                        <Pagination 
                                    showControls 
                                    loop
                                    showShadow 
                                    color="primary" 
                                    key={"pagination"} 
                                    total={pages} 
                                    initialPage={1} 
                                    variant={"flat"} 
                                    page={Number(pageIndex)}
                                    onChange={page => setPageIndex(String(page))}
                        />
                    </CardFooter>
                </Card>
            </div>
            <Footer />
        </>
    );
}