import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ItineraryRequest from "./pages/ItineraryRequest";
import ItineraryLibrary from "./pages/ItineraryLibrary";
import Profile from "./pages/Profile"
import Community from "./pages/Community";
import NoPageFound from "./pages/NoPageFound";
import { atom, useAtom } from "jotai";
import Createjob from "./pages/Createjob";
import Navbar1 from "./components/Navbar1";
import Register from "./components/Register";

export const loginAtom = atom(false);

const Protected = ({children}) => {
  const [login, _] = useAtom(loginAtom);
  if (!login) { //made it login = false temporarily***********************
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
          <Route path="/" element={<Navbar1 />}>
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
             <Route
              path="register"
              element={
                  <Register />               
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
