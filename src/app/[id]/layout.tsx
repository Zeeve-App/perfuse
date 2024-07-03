import { headers } from "next/headers";
import Actions from "./_components/actions";
import TabContainer from "./_components/tabs-container";
import { Navigation } from "@/lib/components/navigation";
import { getNetworkData, getNodeData, getTask } from "@/db-queries";
import { config } from "@/config/config";

const IdPageClient: React.FC<{ children: React.ReactNode; params: { id: string } }> = async ({ children, params }) => {
  const id = params.id;
  const headersList = headers();

  const host = headersList.get("host");
  const explorer = config.client.explorer || "https://polkadot.js.org/apps/";
  const network = await getNetworkData(id);
  const rpcNode = await getNodeData({ network_id: id, node_type: "rpc" });
  let rpcUrl = "";
  if (rpcNode?.node_auth_method === "api_key") {
    rpcUrl = `ws://${host?.split(":")[0]}/${rpcNode.node_api_key}`;
  } else {
    rpcUrl = `ws://${rpcNode?.node_username}:${rpcNode?.node_password}@${host?.split(":")[0]}`;
  }

  const paraExplorerUrl = `${explorer}/?rpc=${encodeURIComponent(`${rpcUrl}/para-rpc`)}#explorer`;
  const relayExplorerUrl = `${explorer}/?rpc=${encodeURIComponent(`${rpcUrl}/relay-rpc`)}#explorer`;

  const task = await getTask({ task_associated_network_id: network?.network_id, task_type: "network_provision" });

  if (!network) {
    return "network not found";
  }

  return (
    <div className="flex flex-col gap-y-3 lg:gap-y-6">
      <div className="rounded-lg border border-brand-outline bg-white px-3 pb-3 pt-6 lg:px-6 lg:pb-6">
        <Navigation heading={"Parachains"}>
          {/* page actions */}
          <Actions network={network} task={task} explorerUrl={{ paraExplorerUrl, relayExplorerUrl }} />
        </Navigation>
        <TabContainer id={params.id} />
        <div className="mb-4 gap-4 overflow-x-auto border-0">{children}</div>
      </div>
    </div>
  );
};

export default IdPageClient;
