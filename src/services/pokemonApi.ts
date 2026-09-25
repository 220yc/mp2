import axios from "axios";
import type { Pokemon } from "../types/Pokemon";

const API_URL = "https://pokeapi.co/api/v2";

export async function getPokemon(id: number): Promise<Pokemon> {
  const response = await axios.get(`${API_URL}/pokemon/${id}`);

  const data = response.data;

  return {
    id: data.id,
    name: data.name,
    image: data.sprites.other["official-artwork"].front_default,
    height: data.height,
    weight: data.weight,
    types: data.types.map(
      (item: { type: { name: string } }) => item.type.name
    ),
  };
}