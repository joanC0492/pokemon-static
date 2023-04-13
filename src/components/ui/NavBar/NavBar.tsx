import Image from "next/image";
import Link from "next/link";

export const NavBar = () => {
  return (
    <div className="bg-[#121113] text-white">
      <div className="container">
        <div className="flex w-full flex-row items-center justify-center">
          <Link className="flex items-center" href={"/"}>
            <Image
              src={
                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png"
              }
              alt="Pokemon ditto"
              width={70}
              height={70}
            />
            <p>
              <span className="text-3xl">P</span>
              <span className="text-lg">okémon</span>
            </p>
          </Link>
          <div className="ml-auto">
            <Link href={"/favorites"} className="text-base">
              Favoritos
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};