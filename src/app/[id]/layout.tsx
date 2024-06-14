import Image from "next/image";
import Actions from "./_components/actions";
import TabContainer from "./_components/tabs-container";
import { withBasePath } from "@/utils/helpers";
import { Navigation } from "@/lib/components/navigation";

const IdPageClient: React.FC<{ children: React.ReactNode; params: { id: string } }> = ({ children, params }) => {
  const id = params.id;
  const items = [
    {
      href: `#`,
      label: "Dashboard",
    },
    {
      href: "#",
      label: "Parachains",
    },
    {
      href: `/${id}`,
      label: "name",
      isActive: true,
    },
  ];

  return (
    <div className="flex flex-col gap-y-3 lg:gap-y-6">
      <Navigation
        heading={"Parachains"}
        logo={
          <Image
            src={withBasePath("/assets/images/protocol/parachains-logo.svg")}
            alt="parachains-logo"
            width={32}
            height={32}
          />
        }
        breadcrumb={{ items: items }}
      >
        {/* page actions */}
        <Actions />
      </Navigation>
      <div className="rounded-lg border border-brand-outline bg-white px-3 pb-3 pt-2 lg:px-6 lg:pb-6">
        <TabContainer id={params.id} />
        <div className="mb-4 gap-4 overflow-x-auto border-0">{children}</div>
      </div>
    </div>
  );
};

export default IdPageClient;
