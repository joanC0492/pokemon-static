import { GetStaticProps, NextPage } from "next";
import { Layout } from "@/components/layouts";
import { pokeApi } from "@/api";
import { PokemonListResponse, SmallPokemon } from "@/interfaces";
import { PokemonCard } from "@/components/pokemon";
import { Searching } from "@/components/ui";
import { useState } from "react";

interface IProps {
  pokemons: SmallPokemon[];
}
const Home: NextPage<IProps> = ({ pokemons }) => {
  const [search, setSearch] = useState<string>("");

  const handleSearch = (text: string) => {
    setSearch(text);
  };

  const pokemonFilters = pokemons.filter((pokemon) => {
    const txtSearch = search.toLocaleLowerCase().trim();
    const txtPokemon = pokemon.name.toLocaleLowerCase().trim();
    return txtPokemon.includes(txtSearch);
  });
  
  return (
    <Layout title={"Listado de Pókemons"}>
      <Searching search={search} handleSearch={handleSearch} />
      <div className="container">
        <div className="py-8 text-white">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
            {pokemonFilters.map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await pokeApi.get<PokemonListResponse>("/pokemon?limit=151");

  const pokemons: SmallPokemon[] = data.results.map((pokemon, i) => {
    const id = i + 1;
    return {
      ...pokemon,
      id,
      img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`,
    };
  });

  return {
    props: {
      pokemons,
    },
  };
};

export default Home;
