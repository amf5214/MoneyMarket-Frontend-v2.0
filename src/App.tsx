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

function App() {

  return (
      <Router>
        <Toolbar />
        <Routes>
          <Route path={Path.HOME} element={<Home />} />
          <Route path={Path.SIGNIN} element={<SignInPage />} />
          <Route path={Path.MARKET_NEWS} element={<MarketNewsPage />} />
          <Route path={Path.LIVE_MARKETS} element={<LiveMarketsPage />} />
        </Routes>
      </Router>
  )
}

export default App
