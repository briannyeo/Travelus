import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ItineraryRequest from "./pages/ItineraryRequest";
import ItineraryLibrary from "./pages/ItineraryLibrary";
import Profile from "./pages/Profile"
import Community from "./pages/Community";
import NoPageFound from "./pages/NoPageFound";
import { atom, useAtom } from "jotai";
import Createjob from "./pages/Createjob";

export const loginAtom = atom(false);

const Protected = ({children}) => {
  const [login, _] = useAtom(loginAtom);
  if (login) { //made it login = false temporarily***********************
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
            <Route
              path="request"
              element={
                <Protected>
                  <ItineraryRequest />
                </Protected>
              }
            />
            <Route
              path="library"
              element={
                <Protected>
                  <ItineraryLibrary />
                </Protected>
              }
            />
            <Route
              path="community"
              element={
                <Protected>
                  <Community />
                </Protected>
              }
            />
            <Route
              path="profile"
              element={
                <Protected>
                  <Profile />
                </Protected>
              }
            />
             <Route
              path="createjob"
              element={
                <Protected>
                  <Createjob />
                </Protected>
              }
            />
          </Route>
          
          
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
