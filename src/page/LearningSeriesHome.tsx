import Toolbar from "../component/Toolbar";
import {useNavigate, useParams} from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import { Button, Divider, Listbox, ListboxItem, Navbar, NavbarContent } from "@nextui-org/react";
import "../style/page/learningserieshome.css";
import { Offcanvas } from "../component/Offcanvas";
import {getLearningPages, getLearningSeries} from "../services/learning-hub/serieshome.service.ts";
import Cookies from "js-cookie";
import {ApiError} from "../services/error.service.ts";
import PathService from "../services/path.service.ts";
import {LearningSeries} from "../services/learning-hub/LearningSeries.ts";
import {LearningPage} from "../services/learning-hub/LearningPage.ts";
import { Footer } from "../component/Footer.tsx";

interface Props {

}

export const LearningSeriesHomePage = ({ }:Props ) => {

    const navigate = useNavigate();

    const [searchParams] = useSearchParams();

    const { seriesId } = useParams();

    const [learningSeries, setLearningSeries] = useState<LearningSeries>();

    const [learningPages, setLearningPages] = useState<LearningPage[]>();

    const[currentPage, setCurrentPage] = useState(0);

    const [showOffcanvasMenu, setShowOffcanvasMenu] = useState(false);

    const closeOffcanvasMenu = () => {
        setShowOffcanvasMenu(false);
    }

    useEffect(() => {
        console.log("edit=" + searchParams.get("edit"));
        console.log("page=" + searchParams.get("page") != undefined && searchParams.get("page") != null ? searchParams.get("page") : "undefined");
        if(searchParams.get("page") != undefined && searchParams.get("page") != null) {
            let param = searchParams.get("page") != undefined && searchParams.get("page") != null ? searchParams.get("page") : "0";
            // @ts-ignore
            setCurrentPage(Number.parseInt(param));
        } else {
            setCurrentPage(0);
            navigate("/learning/series/" + seriesId + "?edit=" + searchParams.get("edit") + "&page=0")
        }
        console.log("currentPage=" + currentPage);

    }, [searchParams]);

    useEffect(() => {
        const getSeries = async () => {
            const cookie: string | undefined = Cookies.get("Authorization");
            if (cookie != undefined && seriesId != undefined) {
                const response = await getLearningSeries(cookie, seriesId);
                if(response != undefined && response != ApiError.UNAUTHORIZED) {
                    setLearningSeries(response);
                    const pages:LearningPage[] | undefined | ApiError.UNAUTHORIZED = await getLearningPages(cookie, seriesId);
                    if(pages != undefined && pages != ApiError.UNAUTHORIZED) {
                        setLearningPages(pages);
                    } else if(pages == ApiError.UNAUTHORIZED) {
                        navigate(PathService.SIGNIN);
                    } else {
                        console.log(response);
                    }
                } else if(response == ApiError.UNAUTHORIZED) {
                    navigate(PathService.SIGNIN);
                } else {
                    console.log(response);
                }
            }
        }

        getSeries();
    }, []);

    // @ts-ignore
    return (
        <>
            <Toolbar />
            <div className="w-full min-h-[90vh] relative">
                <Navbar className="w-full bg-slate-900">
                    <NavbarContent justify="center">
                        <h1 className="text-center text-2xl text-white">{ learningSeries != null ? learningSeries.title : "" }</h1>
                    </NavbarContent>
                    <NavbarContent justify="end">
                        <Button isIconOnly variant="solid" color="primary" className="" onClick={_e => setShowOffcanvasMenu(true)}>
                            <MenuIcon />
                        </Button>
                    </NavbarContent>
                    
                    
                </Navbar>
                
                <div>
                    <div className="w-full flex flex-col items-center">
                        <iframe src={learningPages != undefined && learningPages.length > 0 ? learningPages[currentPage].videoSource : ""}
                            className="lg:w-[85vw] lg:h-[65vh] border-0 mt-3 mb-3"
                            title="YouTube video player" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; web-share" 
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen />
                    </div>
                    <div className="w-full bg-slate-900 text-white p-4">
                        <h1 className="text-center text-xl">{learningPages != undefined && learningPages.length > 0 ? learningPages[currentPage].title : null}</h1>
                        <h1 className="text-center text-lg">{learningSeries != undefined ? learningSeries?.authorName : null}</h1>
                    </div>
                    <div className="w-full text-center p-3">
                        <p className="ml-4 mr-4">{learningPages != undefined && learningPages.length > 0 ? learningPages[currentPage].description : null}</p>
                    </div>
                </div>
                <Offcanvas show={showOffcanvasMenu} onClose={closeOffcanvasMenu}>
                    <h2 className="text-center m-4">{learningSeries != undefined && true ? learningSeries.title : ""}</h2>
                        <Divider />
                        <Listbox items={learningPages} label={learningSeries != undefined && true ? learningSeries.title : ""} >
                            {(item:any) => (
                                <ListboxItem key={"moduleNumber_" + item.orderId} onClick={_e => navigate("/learning/series/" + seriesId + "?edit=" + searchParams.get("edit") + "&page=" + (item.orderId - 1).toString())}>
                                    {"Section " + item.orderId + ": " + item.title}
                                </ListboxItem>
                            )}
                        </Listbox>
                    </Offcanvas>
            </div>
            <Footer />
        </>
    );
}