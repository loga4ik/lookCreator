import { ItemDetail } from "./ItemDetail";

type Params = { id: string };

const Page = async ({ params }: { params: Promise<Params> }) => {
  const { id } = await params;
  return <ItemDetail id={Number(id)} />;
};

export default Page;
