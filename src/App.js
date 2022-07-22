import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Nav from "./components/Nav";
import Home from "./pages/Home";
import Details from "./pages/Details";
import Ability from "./pages/Ability";
import Searched from "./pages/Searched";

function App() {
  const location = useLocation();
  const [pokemons, setPokemons] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );
  const [nextPageUrl, setNextPageUrl] = useState("");
  const [prevPageUrl, setprevPageUrl] = useState("");

  useEffect(() => {
    getPokemonsData();
  }, [currentPageUrl]);

  async function getPokemonsData() {
    const api = await fetch(currentPageUrl);
    const data = await api.json();

    setPokemons(data.results);
    setNextPageUrl(data.next);
    setprevPageUrl(data.previous);
  }

  return (
    <div>
      <Nav />
      <AnimatePresence exitBeforeEnter>
        <Routes location={location} key={location.key}>
          <Route
            path="/"
            element={
              <Home
                pokemons={pokemons}
                nextPageUrl={nextPageUrl}
                prevPageUrl={prevPageUrl}
                setCurrentPageUrl={setCurrentPageUrl}
              />
            }
          />

          <Route path="/details/:id" element={<Details />} />
          <Route path="/ability/:name" element={<Ability />} />
          <Route path="/searched/:search" element={<Searched />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
