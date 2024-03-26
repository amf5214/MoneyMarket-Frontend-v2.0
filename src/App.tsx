// React imports
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

// Style imports 
import './style/App.css';

// Local imports
import Path from "./services/path.service";
import Home from "./page/Home";
import Toolbar from './component/Toolbar';
import SignInPage from "./page/SignIn";
import { MarketNewsPage } from "./page/MarketNews";
import { LiveMarketsPage } from "./page/LiveMarkets";
import PrivateRoutes from "./component/PrivateRoutes";
import { LiveMarketsHomePage } from "./page/LiveMarketsHome";

function App() {

  return (
      <Router>
        <Routes>
          <Route path={Path.HOME} element={<Home />} />
          <Route path={Path.SIGNIN} element={<SignInPage />} />
          <Route element={<PrivateRoutes />}>
            <Route path={Path.MARKET_NEWS} element={<MarketNewsPage />} />
            <Route path={Path.LIVE_MARKETS + "/:ticker"} element={<LiveMarketsPage />} />
            <Route path={Path.LIVE_MARKETS} element={<LiveMarketsHomePage />} />
          </Route>
        </Routes>
      </Router>
  )
}

export default App
