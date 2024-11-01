import DeployPage from "./page-client";
import { getNetworks } from "@/db-queries";

export default async function Home() {
  const networks = await getNetworks();
  return (
    <>
      <DeployPage deployed={Boolean(networks.length)} />
    </>
  );
}
