import Toolbar from "../component/Toolbar";
import { Footer } from "../component/Footer";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import { Accordion, Button, Card, Divider, Listbox, ListboxItem, Navbar, NavbarContent } from "@nextui-org/react";
import "../style/page/learningserieshome.css";
import { Offcanvas } from "../component/Offcanvas";

interface Props {

}

export const LearningSeriesHomePage = ({ }:Props ) => {

    const [searchParams, setSearchParams] = useSearchParams();

    const [showOffcanvasMenu, setShowOffcanvasMenu] = useState(false);

    const closeOffcanvasMenu = () => {
        setShowOffcanvasMenu(false);
    }

    const dummyUrl = "https://www.youtube.com/embed/kPd3MMxp6P4?si=XW_KqJahOE2zud4f"
    const dummyTitle = "Complete C# Masterclass"
    const modules = [
        {title: "course Introduction", pageNumber: 1}, 
        {title: "Introduction to DotNet", pageNumber: 2},
        {title: "Object Oriented Programming", pageNumber: 3},
        {title: "Compiling C#", pageNumber: 4},
        {title: "Naming Convntions", pageNumber: 5},
        {title: "Variable Types in C#", pageNumber: 6},
        {title: "Introduction to Namespaces", pageNumber: 7}
    ]

    useEffect(() => {
        console.log(searchParams.get("edit"));
    }, [searchParams]);

    return (
        <>
            <Toolbar />
            <div className="w-full min-h-[90vh] relative">
                <Navbar className="w-full bg-slate-900">
                    <NavbarContent justify="center">
                        <h1 className="text-center text-2xl text-white">{ dummyTitle }</h1>
                    </NavbarContent>
                    <NavbarContent justify="end">
                        <Button isIconOnly variant="solid" color="primary" className="" onClick={e => setShowOffcanvasMenu(true)}>
                            <MenuIcon />
                        </Button>
                    </NavbarContent>
                    
                    
                </Navbar>
                
                <div>
                    <div className="w-full flex flex-col items-center">
                        <iframe src={dummyUrl}
                            className="lg:w-[85vw] lg:h-[65vh] border-0 mt-3 mb-3"
                            title="YouTube video player" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; web-share" 
                            referrerpolicy="strict-origin-when-cross-origin"
                            allowfullscreen />
                    </div>
                    <div className="w-full">

                    </div>
                </div>
                    <Offcanvas show={showOffcanvasMenu} onClose={closeOffcanvasMenu}>
                        <h2 className="text-center m-4">{dummyTitle}</h2>
                        <Divider />
                        <Listbox items={modules} label={dummyTitle} >
                            {(item:any) => (
                                <ListboxItem key={"moduleNumber_" + item.pageNumber}>
                                    {"Section " + item.pageNumber + ": " + item.title}
                                </ListboxItem>
                            )}
                        </Listbox>
                    </Offcanvas>
            </div>
            
        </>
    );
}