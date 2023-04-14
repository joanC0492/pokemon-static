import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { SmallPokemon } from "@/interfaces";
import { useRouter } from "next/router";

interface IProps {
  pokemon: SmallPokemon;
  className?: string;
}
export const PokemonCard = ({ pokemon, className = "" }: IProps) => {
  const router = useRouter();

  return (
    <div className={`${className}`}>
      <Card className="bg-[#121113] text-white">
        <CardActionArea onClick={() => router.push(`pokemon/${pokemon.id}`)}>
          <CardMedia
            component="img"
            image={pokemon.img}
            alt={pokemon.name}
            className="h-36 w-full object-contain"
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              className="flex justify-between">
              <span className="capitalize">{pokemon.name}</span>
              <span>#{pokemon.id}</span>
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
};