import { motion } from "framer-motion";

import Card from "../components/Card";

export default function Home({
  pokemons,
  nextPageUrl,
  prevPageUrl,
  setCurrentPageUrl,
}) {
  const gotoNextPage = () => {
    setCurrentPageUrl(nextPageUrl);
  };

  const gotoPrevPage = () => {
    setCurrentPageUrl(prevPageUrl);
  };

  return (
    <motion.div
      className="home-page container"
      initial={{ x: "100vw" }}
      animate={{ x: 0 }}
      exit={{ x: "-100vw" }}
      transition={{ type: "spring", stiffness: 80 }}
    >
      <div className="homepage-title">
        <h1>All Pokemons Around The World</h1>
      </div>
      <div className="homepage-card-container">
        {pokemons.map((pokemon) => {
          return <Card key={pokemon.name} pokemon={pokemon} />;
        })}
      </div>

      <div className="homepage-button-container">
        {prevPageUrl && <button onClick={gotoPrevPage}>Previous</button>}
        {nextPageUrl && <button onClick={gotoNextPage}>Next</button>}
      </div>
    </motion.div>
  );
}
