import { FavoriteCardPokemon } from "./FavoriteCardPokemon";

interface IProps {
  pokemons: number[];
}
export const FavoritePokemons = ({ pokemons }: IProps) => {
  return (
    <div className="grid container grid-cols-6 gap-4 py-4">
      {pokemons.map((id) => (
        <FavoriteCardPokemon pokemonId={id} />
      ))}
    </div>
  );
};

