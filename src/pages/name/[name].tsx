import { useEffect, useState } from "react";
import { NextPage, GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import confetti from "canvas-confetti";
import { pokeApi } from "@/api";
import { Layout } from "@/components/layouts";
import { Pokemon, PokemonListResponse } from "@/interfaces";
import {
  Button,
  Card,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
import { getPokemonInfo, localFavorites } from "@/utils";

interface IProps {
  pokemon: Pokemon;
}
const PokemonByNamePage: NextPage<IProps> = ({ pokemon }) => {
  const [isInFavorites, setIsInFavorites] = useState<boolean>(false);

  const handleIsInFavorites = (): void =>
    setIsInFavorites(localFavorites.existInFavorites(pokemon.id));

  const onToggleFavorite = (): void => {
    localFavorites.toggleFavorite(pokemon.id);
    handleIsInFavorites();
    if (isInFavorites) return;
    confetti({
      zIndex: 999,
      particleCount: 100,
      spread: 160,
      angle: -100,
      origin: {
        x: 1,
        y: 0,
      },
    });
  };
  useEffect(() => {
    handleIsInFavorites();
  }, []);

  return (
    <Layout title={pokemon.name}>
      <div className="container py-8">
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-12 md:col-span-4">
            <Card className="bg-[#121113] text-white h-full">
              <CardMedia
                component="img"
                image={
                  pokemon.sprites.other?.dream_world.front_default ||
                  "no-image.png"
                }
                alt={pokemon.name}
                className="h-64 w-full object-contain p-8"
              />
            </Card>
          </div>
          <div className="col-span-12 md:col-span-8">
            <Card className="bg-[#121113] text-white h-full">
              <CardContent>
                <div className="flex flex-wrap justify-between items-center">
                  <Typography
                    gutterBottom
                    variant="h4"
                    component="h1"
                    className="flex justify-between">
                    <span className="capitalize">{pokemon.name}</span>
                  </Typography>
                  <Button
                    className={`normal-case  rounded-lg px-6 outline outline-1 outline-white/50 transition-all duration-200 hover:opacity-80 ${
                      isInFavorites
                        ? "bg-white text-black"
                        : "bg-black text-white"
                    }`}
                    onClick={onToggleFavorite}>
                    {isInFavorites ? "En favoritos" : "Guardar en Favoritos"}
                  </Button>
                </div>
                <div className="mt-5">
                  <Typography variant="h5" component={"p"}>
                    Sprites:
                  </Typography>
                  <div className="flex flex-wrap justify-center md:justify-between">
                    <Image
                      src={pokemon.sprites.front_default}
                      alt={pokemon.name}
                      width={100}
                      height={100}
                    />
                    <Image
                      src={pokemon.sprites.back_default}
                      alt={pokemon.name}
                      width={100}
                      height={100}
                    />
                    <Image
                      src={pokemon.sprites.front_shiny}
                      alt={pokemon.name}
                      width={100}
                      height={100}
                    />
                    <Image
                      src={pokemon.sprites.back_shiny}
                      alt={pokemon.name}
                      width={100}
                      height={100}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const { data } = await pokeApi.get<PokemonListResponse>("/pokemon?limit=151");

  const paths = data.results.map((item) => ({
    params: {
      name: item.name,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { name } = params as { name: string };

  return {
    props: {
      pokemon: await getPokemonInfo(name),
    },
  };
};

export default PokemonByNamePage;
