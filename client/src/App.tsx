import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ItineraryRequest from "./pages/ItineraryRequest";
import ItineraryLibrary from "./pages/ItineraryLibrary";
import Community from "./pages/Community";
import NoPageFound from "./pages/NoPageFound";
import { atom, useAtom } from "jotai";

export const loginAtom = atom(false); //create a atom with state of false and export

const Protected = (children: any) => {
  const [login, _] = useAtom(loginAtom);
  if (login) {
    return children;
  } else {
    return <NoPageFound />;
  }
};

function App() {
  const [login, setLogin] = useAtom(loginAtom);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<Home />} />
            <Route path="request" element={<ItineraryRequest />} />
            <Route path="library" element={<ItineraryLibrary />} />
            <Route path="community" element={<Community />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
