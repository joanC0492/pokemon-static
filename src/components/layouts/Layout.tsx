import Head from "next/head";
import { NavBar } from "../ui";

interface IProps {
  children: React.ReactNode;
  title?: string;
}
export const Layout: React.FC<IProps> = ({
  children,
  title = "Pokemon App",
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="author" content="Joan Cochachi" />
        <meta
          name="description"
          content={`Informacion sobre el pokemon ${title}`}
        />
      </Head>
      <NavBar />
      <main className="bg-black text-white">{children}</main>
    </>
  );
};
