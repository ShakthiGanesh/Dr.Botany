import "./App.css";
import Home from "./Home";
import Results from "./Results";
import ResultsHistory from "./ResultsHistory";
import Header from "./Header";
import History from "./History";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  Redirect,
} from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/results" element={<Results />} />
        <Route exact path="/resultshistory" element={<ResultsHistory />} />
        <Route exact path="/history" element={<History />} />
      </Routes>
    </div>
  );
}

export default App;
