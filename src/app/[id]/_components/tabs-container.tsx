"use client";
import { usePathname, useRouter } from "next/navigation";
import { TabList, Tab } from "@/lib/components/Tabs";
import { TabsContextProvider } from "@/lib/components/Tabs/TabsContext";
import SvgBubbles from "@/lib/icons/essential/outline/Bubbles";
import SvgChart5Square from "@/lib/icons/business/outline/Chart5Square";
import SvgBox from "@/lib/icons/delivery/outline/Box";

const TabContainer = ({ id }: { id: string }) => {
  const router = useRouter();
  // router.
  const path = usePathname();
  const tab = path.split("/").pop();
  // const [activeIndex, setActiveIndex] = useState();
  const tabAndIndexMap: Record<string, number> = {
    "": 0,
    "blockchain-config": 1,
    "collator-nodes": 2,
    "rpc-nodes": 3,
  };

  return (
    <TabsContextProvider
      value={{
        activeIndex: !tab ? 0 : Object.keys(tabAndIndexMap).includes(tab) ? tabAndIndexMap[tab] : 0,
        orientation: "horizontal",
        setActiveIndex: (idx) => {
          const tabName = Object.entries(tabAndIndexMap).find((k, v) => v === idx);

          router.push(`/${id}/${tabName?.[0] ?? ""}`);
        },
      }}
    >
      <TabList className="mb-4 gap-4 overflow-x-auto border-0">
        <Tab>
          <SvgChart5Square width={20} height={20} /> &nbsp; Overview
        </Tab>
        <Tab>
          <SvgBox width={20} height={20} /> &nbsp; Blockchain Config
        </Tab>
        <Tab>
          <SvgBubbles width={20} height={20} /> &nbsp; Collator Nodes
        </Tab>
        <Tab>
          <SvgBubbles width={20} height={20} /> &nbsp; RPC Nodes
        </Tab>
      </TabList>
    </TabsContextProvider>
  );
};

export default TabContainer;
