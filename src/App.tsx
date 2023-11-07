import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Tour from "./components/Tour/Tour";

function App() {


  return (
    <>
      <NavBar />
      <div className="container mx-auto min-h-screen px-2 mt-2 mb-6">
        <Tour />
      </div>
    </>
  );
}

export default App;
