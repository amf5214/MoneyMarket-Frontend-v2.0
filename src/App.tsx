// React imports
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

// Style imports 
import './style/App.css';

import Toolbar from './component/Toolbar';
function App() {

  return (
      <Router>
        <Toolbar />
      </Router>
  )
}

export default App
