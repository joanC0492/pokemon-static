import { Layout } from "@/components/layouts";
import { NextPage } from "next";
import { useRouter } from "next/router";

const PokemonPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <Layout title={"Pókemon"}>
      <div>PokemonPage {id}</div>
    </Layout>
  );
};

export default PokemonPage;

