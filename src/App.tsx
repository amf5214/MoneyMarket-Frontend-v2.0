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
import { LearningHubPage } from "./page/LearningHub";
import { LearningSeriesHomePage } from "./page/LearningSeriesHome";
import { ContentHubPage } from "./page/ContentHub";

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
            <Route path={Path.LEARNING_HUB} element={<LearningHubPage />} />
            <Route path={Path.CONTENT_HUB} element={<ContentHubPage />} />
            <Route path={Path.LEARNING_SERIES + "/:seriesId"} element={<LearningSeriesHomePage />} />
          </Route>
        </Routes>
      </Router>
  )
}

export default App
