import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Details() {
  let params = useParams();
  const [details, setDetails] = useState([]);
  const [abilities, setAbilities] = useState([]);
  const [stats, setStats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchDetail();
  }, []);

  function fetchDetail() {
    fetch(`https://pokeapi.co/api/v2/pokemon/${params.id}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setIsLoading(false);
        setDetails(data);
        setAbilities(data.abilities);
        setStats(data.stats);
      });
  }

  if (isLoading) {
    return <div className="loading-text">Loading...</div>;
  }

  return (
    <motion.div
      className="details-page container"
      initial={{ x: "100vw" }}
      animate={{ x: 0 }}
      exit={{ x: "-100vw" }}
      transition={{ type: "spring", stiffness: 80 }}
    >
      {details.length !== 0 ? (
        <div className="details-container">
          <div className="details-card-header">
            <p className="details-card-name">{details.forms[0].name}</p>
          </div>
          <div className="details-card-body">
            <img
              className="details-card-img"
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${params.id}.png`}
              alt=""
            />

            <div className="details-card-text">
              <div className="details-stats">
                <h4 className="details-ability-title">Stats</h4>
                {stats.map((stat) => {
                  return (
                    <div className="details-stat" key={stat.stat.name}>
                      <p className="details-stat-name">
                        {stat.stat.name.replace("-", " ")}
                      </p>
                      <p>{stat.base_stat}</p>
                    </div>
                  );
                })}
              </div>
              <div className="details-ability">
                <h4 className="details-ability-title">Ability</h4>
                {abilities.map((ability) => {
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
      ) : (
        "Loading..."
      )}
    </motion.div>
  );
}
