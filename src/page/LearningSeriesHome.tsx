import Toolbar from "../component/Toolbar";
import { Footer } from "../component/Footer";

interface Props {
    edit:boolean;
}

export const LearningSeriesHomePage = ({ edit }:Props ) => {
    return (
        <>
            <Toolbar />
            <div>
                
            </div>
            <Footer />
        </>
    );
}