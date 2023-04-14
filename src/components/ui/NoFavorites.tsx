import Image from "next/image";

export const NoFavorites = () => {
  return (
    <div className="container h-[calc(100vh-70px)] flex flex-col gap-6 items-center justify-center py-5">
      <p className="text-4xl font-semibold">No hay favoritos</p>
      <Image
        src={
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/132.svg"
        }
        alt="ditto"
        width={250}
        height={250}
        className="opacity-10"
      />
    </div>
  );
};


