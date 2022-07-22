import { Link } from "react-router-dom";

export default function Card({ pokemon }) {
  return (
    <Link className="link" to={`details/${pokemon.url.slice(34, -1)}`}>
      <div className="pokemon-card">
        <div className="pokemon-card-image">
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${pokemon.url.slice(
              34,
              -1
            )}.png`}
            alt="Pokemon"
          />
        </div>
        <h4 className="pokemon-card-name">{pokemon.name.replace("-", " ")}</h4>
      </div>
    </Link>
  );
}
