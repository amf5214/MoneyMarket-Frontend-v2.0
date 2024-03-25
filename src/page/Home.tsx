// Style imports
import Toolbar from "../component/Toolbar";
import "../style/page/home.css"

const Home = () => {
    return (
        <>
            <Toolbar />
            <div className="body-content"> 
                <figure className="hero-content rounded text-center">
                    <h1 style={{fontSize: "xx-large"}}>Money Market</h1>
                    <h3 style={{fontSize: "x-large"}}>Alpha Storm Project</h3>
                </figure>
            </div>
        </>
    );
}

export default Home;

                    