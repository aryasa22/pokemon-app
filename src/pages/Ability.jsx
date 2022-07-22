import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

export default function Ability() {
  const params = useParams();
  const [ability, setAbility] = useState([]);
  const [abilityPokemons, setAbilityPokemons] = useState([]);

  useEffect(() => {
    fetchAbility();
  }, []);

  const fetchAbility = async () => {
    const api = await fetch(`https://pokeapi.co/api/v2/ability/${params.name}`);
    const data = await api.json();

    setAbility(data.effect_entries);
    setAbilityPokemons(data.pokemon);
  };

  return (
    <motion.div
      className="container"
      initial={{ x: "100vw" }}
      animate={{ x: 0 }}
      exit={{ x: "-100vw" }}
      transition={{ type: "spring", stiffness: 80 }}
    >
      <div className="ability-card">
        <div className="ability-name">
          <h3>{params.name.replace("-", " ")}</h3>
        </div>

        <h4>Ability</h4>
        {ability.map((item) => {
          return <p>{item.language.name === "en" ? item.effect : ""}</p>;
        })}

        <h4>Pokemons:</h4>
        <div className="pokemons-ability">
          {abilityPokemons.map((pokemon) => {
            return (
              <p key={pokemon.name} className="pokemon-ability-name">
                {pokemon.pokemon.name.replace("-", " ")}
              </p>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
