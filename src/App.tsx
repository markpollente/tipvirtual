import "./App.css";
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
       </Routes>
     </main>
   </div>
  );
}

export default App;
