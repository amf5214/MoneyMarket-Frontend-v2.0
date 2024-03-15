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
function App() {

  return (
      <Router>
        <Toolbar />
        <Routes>
          <Route path={Paths.HOME} element={<Home />} />
      </Router>
  )
}

export default App
