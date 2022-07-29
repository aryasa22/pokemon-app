import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Nav() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    navigate("/pokemon-app/searched/" + search);
    setSearch("");
  };

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 120 }}
    >
      <nav className="navbar container">
        <Link className="link" to="/pokemon-app/">
          <h1 className="navbar-brand">Pokemons Club</h1>
        </Link>

        <form onSubmit={submitHandler} className="navbar-form">
          <div className="navbar-search">
            <input
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search your pokemon"
              className="search-input"
              value={search}
            />
          </div>
        </form>
      </nav>
    </motion.div>
  );
}
