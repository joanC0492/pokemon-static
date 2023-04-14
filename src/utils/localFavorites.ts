const toggleFavorite = (id: number) => {
  console.log({ id });
  let favorites: number[] = JSON.parse(
    localStorage.getItem("FAVORITES") || "[]"
  );

  if (favorites.includes(id))
    favorites = favorites.filter((item) => item !== id);
  else favorites.push(id);

  localStorage.setItem("FAVORITES", JSON.stringify(favorites));
};

const existInFavorites = (id: number): boolean => {
  const favorites: number[] = JSON.parse(
    localStorage.getItem("FAVORITES") || "[]"
  );
  return favorites.includes(id);
};

const pokemons = (): number[] => {
  return JSON.parse(localStorage.getItem("FAVORITES") || "[]");
};

export default {
  toggleFavorite,
  existInFavorites,
  pokemons
};


