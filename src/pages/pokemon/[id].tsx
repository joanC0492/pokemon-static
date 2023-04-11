import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { Layout } from "@/components/layouts";

interface IProps {
  id: string;
  name: string;
}
const PokemonPage: NextPage<IProps> = ({ id, name }) => {
  const router = useRouter();
  return (
    <Layout title={"Pókemon"}>
      <div className="container">
        <div>
          {id} {name}
        </div>
      </div>
    </Layout>
  );
};

// Debe usar getStaticPaths si está pre-renderizando estáticamente páginas que usan rutas dinámicas
export const getStaticPaths: GetStaticPaths = async (ctx) => {
  // const { data } = await  // your fetch function here

  return {
    paths: [
      {
        params: {
          id: "1",
        },
      },
      {
        params: {
          id: "2",
        },
      },
      {
        params: {
          id: "3",
        },
      },
    ],
    // Debe ir en falso para que los id's que no estan en el arreglo no se consideren y mande al 404
    fallback: false,
  };
};

// Debería usar getStaticProps cuando:
//- Los datos necesarios para representar la página están disponibles en el momento de la compilación antes de la solicitud del usuario.
//- Los datos provienen de un CMS sin cabeza.
//- Los datos se pueden almacenar en caché públicamente (no específicos del usuario).
//- La página debe estar renderizada previamente (para SEO) y ser muy rápida: getStaticProps genera archivos HTML y JSON, los cuales pueden ser almacenados en caché por un CDN para el rendimiento.
export const getStaticProps: GetStaticProps = async (ctx) => {
  return {
    props: {
      id: 1,
      name: "Toma mi pikaChú",
    },
  };
};

export default PokemonPage;
