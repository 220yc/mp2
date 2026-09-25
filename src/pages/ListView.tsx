import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Pokemon } from "../types/Pokemon";
import { getPokemon } from "../services/pokemonApi";

function ListView() {
  // Store Pokemon data fetched from the API
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);

  // Track whether the data is still loading
  const [loading, setLoading] = useState(true);

  // Store the current search text
  const [search, setSearch] = useState("");

  // Store the selected sorting property
  const [sortBy, setSortBy] = useState<"id" | "name">("id");

  // Store the sorting direction
  const [ascending, setAscending] = useState(true);

  useEffect(() => {
    async function loadPokemon() {
      // Create Pokemon IDs from 1 to 151
      const ids = Array.from(
        { length: 151 },
        (_, index) => index + 1
      );

      // Fetch all Pokemon data
      const results = await Promise.all(
        ids.map((id) => getPokemon(id))
      );

      // Store the fetched Pokemon
      setPokemon(results);

      // Finish loading
      setLoading(false);
    }

    loadPokemon();
  }, []);

  // Filter Pokemon whenever the search text changes
  const filteredPokemon = pokemon.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  // Sort the filtered results
  const sortedPokemon = [...filteredPokemon].sort((a, b) => {
    if (sortBy === "name") {
      return ascending
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    }

    return ascending
      ? a.id - b.id
      : b.id - a.id;
  });

  if (loading) {
    return (
      <main>
        <p>Loading Pokémon...</p>
      </main>
    );
  }

  return (
    <main>
      <h1>Pokédex</h1>

      <div className="controls">
        <input
          type="text"
          placeholder="Search Pokémon..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={sortBy}
          onChange={(e) =>
            setSortBy(e.target.value as "id" | "name")
          }
        >
          <option value="id">Sort by ID</option>
          <option value="name">Sort by Name</option>
        </select>

        <button
          type="button"
          onClick={() => setAscending(!ascending)}
        >
          {ascending ? "Ascending" : "Descending"}
        </button>
      </div>

      <div className="gallery">
        {sortedPokemon.map((p) => (
          <Link
            key={p.id}
            to={`/pokemon/${p.id}`}
          >
            <div className="pokemon-card">
              <img
                src={p.image}
                alt={p.name}
              />

              <h2>
                #{p.id} {p.name}
              </h2>

              <p>
                Type: {p.types.join(", ")}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}

export default ListView;