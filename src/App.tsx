// React imports
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

// Style imports 
import './style/App.css';

// Local imports
import Paths from "./services/paths.service";
import Home from "./page/Home";
import Toolbar from './component/Toolbar';
import SignInPage from "./page/SignIn";
import { MarketNewsPage } from "./page/MarketNews";

function App() {

  return (
      <Router>
        <Toolbar />
        <Routes>
          <Route path={Paths.HOME} element={<Home />} />
          <Route path={Paths.SIGNIN} element={<SignInPage />} />
          <Route path={Paths.MARKET_NEWS} element={<MarketNewsPage />} />
        </Routes>
      </Router>
  )
}

export default App
