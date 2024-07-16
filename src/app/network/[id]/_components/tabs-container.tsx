/**
* SPDX-License-Identifier: AGPL-3.0-or-later
* Copyright (C) 2024 [Perfuse]
* This program is free software: you can redistribute it and/or modify
* it under the terms of the GNU Affero General Public License as
* published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
* This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the Affero General Public License
* along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

"use client";
import { usePathname, useRouter } from "next/navigation";
import { TabList, Tab } from "@/lib/components/Tabs";
import { TabsContextProvider } from "@/lib/components/Tabs/TabsContext";
import SvgBubbles from "@/lib/icons/essential/outline/Bubbles";
import SvgChart5Square from "@/lib/icons/business/outline/Chart5Square";
import SvgBox from "@/lib/icons/delivery/outline/Box";
import { Heading } from "@/lib/components/Heading";

const TabContainer = ({ id }: { id: string }) => {
  const router = useRouter();
  // router.
  const path = usePathname();
  const tab = path.split("/").pop();
  // const [activeIndex, setActiveIndex] = useState();
  const tabAndIndexMap: Record<string, number> = {
    overview: 0,
    "blockchain-config": 1,
    "collator-nodes": 2,
    "rpc-nodes": 3,
  };

  return (
    <TabsContextProvider
      value={{
        //        if no tab present then show 0(overview), if its in the tabAndIndexMap record then show that tab, otherwise show (0)overview
        activeIndex: !tab
          ? tabAndIndexMap["overview"]
          : Object.keys(tabAndIndexMap).includes(tab)
            ? tabAndIndexMap[tab]
            : tabAndIndexMap["overview"],
        orientation: "horizontal",
        setActiveIndex: (idx) => {
          const tabName = Object.entries(tabAndIndexMap).find((k, v) => v === idx);

          // redirect to the tab which is clicked
          router.push(`/network/${id}/${tabName?.[0] ?? ""}`);
        },
      }}
    >
      <TabList className="mb-4 gap-4 overflow-x-auto border-b">
        <Tab>
          <Heading as="h5">
            <SvgChart5Square width={20} height={20} className="inline" /> &nbsp; Overview{" "}
          </Heading>
        </Tab>
        <Tab>
          <Heading as="h5">
            <SvgBox width={20} height={20} className="inline" />
            &nbsp; Blockchain Config{" "}
          </Heading>
        </Tab>
        <Tab>
          <Heading as="h5">
            <SvgBubbles width={20} height={20} className="inline" />
            &nbsp; Collator Nodes{" "}
          </Heading>
        </Tab>
        <Tab>
          <Heading as="h5">
            <SvgBubbles width={20} height={20} className="inline" /> &nbsp; RPC Nodes{" "}
          </Heading>
        </Tab>
      </TabList>
    </TabsContextProvider>
  );
};

export default TabContainer;
