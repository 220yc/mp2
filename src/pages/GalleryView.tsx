import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Pokemon } from "../types/Pokemon";
import { getPokemon } from "../services/pokemonApi";

function GalleryView() {
  // Store Pokemon data fetched from the API
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);

  // Store the selected Pokemon type
  const [selectedType, setSelectedType] = useState("all");

  // Track whether the data is still loading
  const [loading, setLoading] = useState(true);

  // Store an error message if the API request fails
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadPokemon() {
      try {
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
      } catch {
        // Show an error message if the API request fails
        setError("Failed to load Pokémon.");
      } finally {
        // Finish loading whether the request succeeds or fails
        setLoading(false);
      }
    }

    loadPokemon();
  }, []);

  // Filter Pokemon by the selected type
  const filteredPokemon =
    selectedType === "all"
      ? pokemon
      : pokemon.filter((p) =>
          p.types.includes(selectedType)
        );

  if (loading) {
    return (
      <main>
        <p>Loading Pokémon...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main>
        <p>{error}</p>
      </main>
    );
  }

  return (
    <main>
      <h1>Pokémon Gallery</h1>

      <div className="controls">
        <label htmlFor="type-filter">
          Filter by Type:
        </label>

        <select
          id="type-filter"
          value={selectedType}
          onChange={(e) =>
            setSelectedType(e.target.value)
          }
        >
          <option value="all">All</option>
          <option value="normal">Normal</option>
          <option value="fire">Fire</option>
          <option value="water">Water</option>
          <option value="electric">Electric</option>
          <option value="grass">Grass</option>
          <option value="ice">Ice</option>
          <option value="fighting">Fighting</option>
          <option value="poison">Poison</option>
          <option value="ground">Ground</option>
          <option value="flying">Flying</option>
          <option value="psychic">Psychic</option>
          <option value="bug">Bug</option>
          <option value="rock">Rock</option>
          <option value="ghost">Ghost</option>
          <option value="dragon">Dragon</option>
        </select>
      </div>

      <div className="gallery">
        {filteredPokemon.map((p) => (
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

export default GalleryView;