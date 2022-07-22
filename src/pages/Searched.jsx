import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Searched() {
  const params = useParams();
  const [searchedDetails, setSearchedDetails] = useState([]);
  const [searchedAbilities, setSearchedAbilities] = useState([]);
  const [searchedStats, setSearchedStats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFailed, setIsFailed] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsFailed(false);
    fetchSearchedDetail();
  }, [params.search]);

  function fetchSearchedDetail() {
    fetch(
      `https://pokeapi.co/api/v2/pokemon/${params.search
        .toLowerCase()
        .replace(" ", "-")}`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setIsLoading(false);
        setSearchedDetails(data);
        setSearchedAbilities(data.abilities);
        setSearchedStats(data.stats);
      })
      .catch((err) => {
        setIsFailed(true);
        setIsLoading(false);
      });
  }

  if (isLoading) {
    return <div className="loading-text">Loading...</div>;
  }

  if (isFailed) {
    return (
      <div className="loading-text">{`No result for ${params.search}`}</div>
    );
  }

  return (
    <motion.div
      className="details-page container"
      initial={{ x: "100vw" }}
      animate={{ x: 0 }}
      exit={{ x: "-100vw" }}
      transition={{ type: "spring", stiffness: 80 }}
    >
      {searchedDetails.length !== 0 && (
        <div className="details-container">
          <div className="details-card-header">
            <p className="details-card-name">
              {searchedDetails.forms[0].name.replace("-", " ")}
            </p>
          </div>
          <div className="details-card-body">
            <img
              className="details-card-img"
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${searchedDetails.forms[0].url.slice(
                39,
                -1
              )}.png`}
              alt="PokemonImage"
            />

            <div className="details-card-text">
              <div className="details-stats">
                <h4 className="details-ability-title">Stats</h4>
                {searchedStats.map((stat) => {
                  return (
                    <div className="details-stat" key={stat.stat.name}>
                      <p className="details-stat-name">{stat.stat.name}</p>
                      <p>{stat.base_stat}</p>
                    </div>
                  );
                })}
              </div>
              <div className="details-ability">
                <h4 className="details-ability-title">Ability</h4>
                {searchedAbilities.map((ability) => {
                  return (
                    <Link
                      className="link details-ability-link"
                      to={`/ability/${ability.ability.name}`}
                      key={ability.ability.name}
                    >
                      <motion.p
                        whileHover={{
                          scale: 1.1,
                        }}
                      >
                        {ability.ability.name.replace("-", " ")}
                      </motion.p>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
