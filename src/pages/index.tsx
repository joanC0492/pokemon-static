import { Layout } from "@/components/layouts";
import { Button } from "@nextui-org/react";

export default function Home() {
  return (
    <Layout title={"Listado de Pókemons"}>
      <div style={{ textAlign: "center" }}>
        <Button>Hola Mundo :3</Button>
      </div>
    </Layout>
  );
}
