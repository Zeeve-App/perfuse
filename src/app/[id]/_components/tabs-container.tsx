"use client";
import { usePathname, useRouter } from "next/navigation";
import { TabList, Tab } from "@/lib/components/Tabs";
import { TabsContextProvider } from "@/lib/components/Tabs/TabsContext";

const TabContainer = ({ id }: { id: string }) => {
  const router = useRouter();
  // router.
  const path = usePathname();
  const tab = path.split("/").pop();
  // const [activeIndex, setActiveIndex] = useState();
  const tabAndIndexMap: Record<string, number> = {
    "": 0,
    "blockchain-config": 1,
    "my-nodes": 2,
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
        <Tab>Overview</Tab>
        <Tab>Blockchain Config</Tab>
        <Tab>My Nodes</Tab>
      </TabList>
    </TabsContextProvider>
  );
};

export default TabContainer;
