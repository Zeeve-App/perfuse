import Image from "next/image";
import { headers } from "next/headers";
import Actions from "./_components/actions";
import TabContainer from "./_components/tabs-container";
import { withBasePath } from "@/utils/helpers";
import { Navigation } from "@/lib/components/navigation";
import { getNetworkData, getNodeData, getTask } from "@/db-queries";

const IdPageClient: React.FC<{ children: React.ReactNode; params: { id: string } }> = async ({ children, params }) => {
  const id = params.id;
  const headersList = headers();

  headersList.get("host");
  const network = await getNetworkData(id);
  const rpcNode = await getNodeData({ network_id: id, node_type: "rpc" });
  let rpcUrl = "";
  if (rpcNode?.node_auth_method === "api_key") {
    rpcUrl = `wss://${headersList.get("host")}/${rpcNode.node_api_key}/rpc`;
  } else {
    rpcUrl = `wss://${rpcNode?.node_username}:${rpcNode?.node_password}@${headersList.get("host")}/rpc`;
  }

  const explorerUrl = `https://polkadot.js.org/apps/?rpc=${encodeURIComponent(rpcUrl)}#explorer`;

  console.log(explorerUrl);

  const task = await getTask({ task_associated_network_id: network?.network_id, task_type: "network_provision" });

  const items = [
    {
      href: `#`,
      label: "Dashboard",
    },
    {
      href: "/my-parachains",
      label: "My Parachains",
    },
    {
      href: `/${id}`,
      label: network?.network_name ?? "name",
      isActive: true,
    },
  ];

  if (!network) {
    return "network not found";
  }

  return (
    <div className="flex flex-col gap-y-3 lg:gap-y-6">
      <Navigation
        heading={"Parachains"}
        logo={
          <Image
            src={withBasePath("/assets/images/parachains-logo.svg")}
            alt="parachains-logo"
            width={32}
            height={32}
          />
        }
        breadcrumb={{ items: items }}
      >
        {/* page actions */}
        <Actions network={network} task={task} explorerUrl={explorerUrl ?? "#"} />
      </Navigation>
      <div className="rounded-lg border border-brand-outline bg-white px-3 pb-3 pt-2 lg:px-6 lg:pb-6">
        <TabContainer id={params.id} />
        <div className="mb-4 gap-4 overflow-x-auto border-0">{children}</div>
      </div>
    </div>
  );
};

export default IdPageClient;
