import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";
import type { Pokemon } from "../types/Pokemon";
import { getPokemon } from "../services/pokemonApi";

function DetailView() {
  // Get the Pokemon ID from the URL
  const { id } = useParams();

  // Used to navigate between Pokemon detail pages
  const navigate = useNavigate();

  // Convert the route parameter to a number
  const pokemonId = Number(id);

  // Store the selected Pokemon
  const [pokemon, setPokemon] =
    useState<Pokemon | null>(null);

  // Track whether the Pokemon is loading
  const [loading, setLoading] = useState(true);

  // Store an error message if the request fails
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadPokemon() {
      // Validate the Pokemon ID
      if (
        !Number.isInteger(pokemonId) ||
        pokemonId < 1 ||
        pokemonId > 151
      ) {
        setPokemon(null);
        setError("Invalid Pokémon ID.");
        setLoading(false);
        return;
      }

      // Start loading the new Pokemon
      setLoading(true);
      setError("");

      try {
        // Fetch the Pokemon using its ID
        const result = await getPokemon(pokemonId);

        // Store the Pokemon data
        setPokemon(result);
      } catch {
        // Show an error message if the API request fails
        setPokemon(null);
        setError("Failed to load Pokémon.");
      } finally {
        // Finish loading whether the request succeeds or fails
        setLoading(false);
      }
    }

    loadPokemon();
  }, [pokemonId]);

  if (loading) {
    return (
      <main>
        <p>Loading Pokémon...</p>
      </main>
    );
  }

  if (error || !pokemon) {
    return (
      <main>
        <p>{error || "Pokémon not found."}</p>
      </main>
    );
  }

  return (
    <main>
      <h1>Pokémon Details</h1>

      <div className="detail-card">
        <h2>
          #{pokemon.id} {pokemon.name}
        </h2>

        <img
          src={pokemon.image}
          alt={pokemon.name}
        />

        <div className="detail-info">
          <p>
            Type: {pokemon.types.join(", ")}
          </p>

          <p>
            Height: {pokemon.height}
          </p>

          <p>
            Weight: {pokemon.weight}
          </p>
        </div>

        <div className="detail-buttons">
          <button
            type="button"
            disabled={pokemonId <= 1}
            onClick={() =>
              navigate(`/pokemon/${pokemonId - 1}`)
            }
          >
            ← Previous
          </button>

          <button
            type="button"
            disabled={pokemonId >= 151}
            onClick={() =>
              navigate(`/pokemon/${pokemonId + 1}`)
            }
          >
            Next →
          </button>
        </div>
      </div>
    </main>
  );
}

export default DetailView;