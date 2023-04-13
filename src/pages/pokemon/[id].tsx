import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { Layout } from "@/components/layouts";
import { pokeApi } from "@/api";
import { Pokemon } from "@/interfaces";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useEffect } from "react";

interface IProps {
  pokemon: Pokemon;
}
const PokemonPage: NextPage<IProps> = ({ pokemon }) => {
  const onToggleFavorite = () => {
    console.log("ID: ", pokemon.id);
    localStorage.setItem("FAVORITES", JSON.stringify(pokemon.id));
  };

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
                    className="normal-case bg-black text-white rounded-lg px-6 outline outline-1 outline-white/50 hover:bg-black/5 transition-all duration-200"
                    onClick={onToggleFavorite}>
                    Guardar en Favoritos
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

// Debe usar getStaticPaths si está pre-renderizando estáticamente páginas que usan rutas dinámicas
export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const pokemons151 = [...Array(151)].map((value, index) => ({
    params: {
      id: `${index + 1}`,
    },
  }));
  console.log(pokemons151);

  return {
    paths: pokemons151,
    // Debe ir en falso para que los id's que no estan en el arreglo no se consideren y mande al 404
    fallback: false,
  };
};

// Debería usar getStaticProps cuando:
//- Los datos necesarios para representar la página están disponibles en el momento de la compilación antes de la solicitud del usuario.
//- Los datos provienen de un CMS sin cabeza.
//- Los datos se pueden almacenar en caché públicamente (no específicos del usuario).
//- La página debe estar renderizada previamente (para SEO) y ser muy rápida: getStaticProps genera archivos HTML y JSON, los cuales pueden ser almacenados en caché por un CDN para el rendimiento.
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string };

  const { data } = await pokeApi.get<Pokemon>(`/pokemon/${id}`);
  console.log(data);
  return {
    props: {
      pokemon: data,
    },
  };
};

export default PokemonPage;
