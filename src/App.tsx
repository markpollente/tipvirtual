import "./App.css";
import About from './components/About/About';
import Freenav from './components/Freenav/Freenav';
import Facilities from './components/Facilities/Facilities';
import NavBar from "./components/NavBar/NavBar";
import Home from "./scenes/Home";
import {
  Routes,
  Route,
} from "react-router-dom";

function App() {


  return (
    <div className="container min-h-screen min-w-full justify-center flex">
     <NavBar/>
     <main className="container min-h-screen">
       <Routes>
         <Route path="/" element={<Home />}/>
         <Route path="/about" element={<About />}/>
         <Route path="/facilities" element={<Facilities />}/>
         <Route path="/tour" element={<Freenav />}/>
       </Routes>
     </main>
   </div>
  );
}

export default App;
