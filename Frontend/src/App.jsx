import React from "react";
import { Routes, Route } from "react-router-dom"; // ✅ import these
import Home from "./Components/Home";
import About from "./Components/About";
import Contact from './Components/Contact'
import SoilTesting from './Components/SoilTesting';
import GovAssistance from './Components/GovAssistance';
import FarmerAssistanceDashboard from './Components/FarmerAssistanceDashboard';
import MarketCommitee from "./Components/MarketCommitee";
import DealCommitee from "./Components/DealCommitee";
import TechSupport from "./Components/TechSupport";

const App = () => {
  return (
    <div className="bg-green-100 min-h-screen">
      <Routes>
        <Route path="/" element={<Home />} />       {/* Home at root */}
        <Route path="/about" element={<About />} /> {/* About page */}
         <Route path="/contact" element={<Contact/>} /> {/* About page */}
         <Route path="/soil-testing" element={<SoilTesting/>}/>
          <Route path="/gov-assistance" element={<GovAssistance/>}/>
           <Route path="/assistance-dashboard" element={<FarmerAssistanceDashboard />} /> 
           <Route path="/market-commitee" element={<MarketCommitee/>}/>
            <Route path="/deal-commitee" element={<DealCommitee/>}/>
             <Route path="/tech-support" element={<TechSupport/>}/>

      </Routes>
    </div>
  );
};

export default App;
