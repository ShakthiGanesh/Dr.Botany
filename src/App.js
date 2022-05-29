<<<<<<< HEAD
import './App.css';
import axios from 'axios'
import History from './History';
import Loader from './Loader';

=======
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
>>>>>>> 34b56521112aaf13c1cfdd3ead2304f313a1025d
function App() {

  function postHistory() {
    var date = new Date().toString();
    var i = date.indexOf(" ")
    date = date.slice(i + 1)
    date = date.split(" G", 2)[0]
    axios.post("http://localhost:5000/addhistory", {
      email: "122004231@sastra.ac.in",
      query: {
        querypic: "https://apps.lucidcentral.org/pppw_v10/images/entities/tomato_red_spider_mite_477/thumbs/img_6153_sml.jpg",
        result: "Tomato_Spider_mites_Two_spotted_spider_mite",
        impact: "The extent of the damage caused by mites often depends on rainfall. When rainfall is low, mite populations are high and reduce crop yields. On taro, for instance, yellowing and early maturity of plants occurs and corm size is reduced. Damage is particularly severe during droughts and, presumably, outbreaks will increase with climate change.",
        detection: "Look at the underside of leaves, particularly near the veins for the presence of mites, using a hand lens and/or a microscope. Look for webbing, which can be seen when mites are present in large numbers. The white spots on the upper leaf surface and the presence of webs below are signs of their presence. Look for spots on the mites; the spots are reddish-brown to yellowish-green, depending on the species.A good way to detect if mites are present is to place a sheet of white paper beneath the leaves and strike the leaves sharply. The mites fall onto the paper and can be more easily seen than on the green leaves.",
        cure: "If pesticides are used, they should be applied carefully. Rotate between different chemical groups, to prevent resistance developing to any one of them. There are several products registered in Australia for use against red spider mites (abamectin, bifenthrin, chlorpyriphos, dimethoate, malathion), but note that they are toxic to natural enemies and that tomato red spider mite may tolerate them. Not all insecticides kill mites, and those that do may not kill all the stages. Eggs are particularly resistant to pesticides and so, too, are larvae and nymphs, especially when moulting, as they do not feed. More than one application is needed at 5-10 days apart. Use products containing sulphur - a product allowed under organic certification. Use abamectin, a product derived from a soil bacterium. It is absorbed into plants but is not systemic.",
        date: date,
        plant: "Tomato",
      }
    })
      .then(res => {
        console.log(res.data)
      }
      )
      .catch(err => console.log(err))
  }

  function getHistory() {
    axios.get("http://localhost:5000/gethistory", {
      params: {
        email: "122004231@sastra.ac.in"
      }
    })
      .then(res => console.log(res.data))
      .catch(err => console.log(err))
  }

  function getCure() {
    axios.get("http://localhost:5000/getcure", {
      params: {
        disease: "Late Blight"
      }
    })
      .then(res => console.log(res.data))
      .catch(err => console.log(err))
  }
  return (
    <div className="App">
<<<<<<< HEAD
      {/* <button onClick={postHistory}>Post History</button>
      <button onClick={getHistory}>Get History</button>
      <button onClick={getCure}>Get Cure</button> */}
      {/* <Loader /> */}

      <History />
=======
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/results" element={<Results />} />
        <Route exact path="/resultshistory" element={<ResultsHistory />} />
        <Route exact path="/history" element={<History />} />
      </Routes>
>>>>>>> 34b56521112aaf13c1cfdd3ead2304f313a1025d
    </div>
  );
}

export default App;
