import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Home from "./scenes/Home";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {


  return (
    <div className="App">
     <NavBar/>
     <main>
       <Routes>
         <Route path="/" element={<Home />}/>
       </Routes>
     </main>
   </div>
  );
}

export default App;
