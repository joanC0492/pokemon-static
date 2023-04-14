import { Card, CardActionArea, CardMedia } from "@mui/material";
import { useRouter } from "next/router";

interface IProps {
  pokemonId: number;
}
export const FavoriteCardPokemon = ({ pokemonId }: IProps) => {
  const router = useRouter();
  return (
    <Card className="bg-[#121113] p-4" key={pokemonId}>
      <CardActionArea onClick={() => router.push(`/pokemon/${pokemonId}`)}>
        <CardMedia
          component="img"
          height="140"
          image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`}
          alt="Pokemon Favorite"
        />
      </CardActionArea>
    </Card>
  );
};

