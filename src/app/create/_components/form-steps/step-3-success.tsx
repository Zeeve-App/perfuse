"use client";
import Image from "next/image";
import Link from "next/link";
import { withBasePath } from "@/utils/helpers";
import { Heading } from "@/lib/components/Heading";
import { Button } from "@/lib/components/Button";
import { useCreateNetworkFormStore } from "@/store/create-network";

const DeploySucceed = () => {
  // localStorage.setItem("from", "parachains");

  const { configureNetwork } = useCreateNetworkFormStore();
  return (
    <div className="flex flex-col gap-y-3 p-4 lg:gap-y-6">
      <div className="flex justify-items-start  gap-4 rounded-lg border border-brand-outline p-3 bg-brand-gradient-blue-48 lg:p-6">
        <div className="flex flex-col items-start justify-center gap-2 p-4">
          <Heading as="h3" className="font-normal text-white">
            Congratulations! You have <br /> successfully deployed &ldquo;
            {configureNetwork?.chainSpecFile.contents.name}&rdquo;
          </Heading>
          <Button
            colorScheme={"light"}
            className="text-brand-blue"
            onClick={() => {
              window.open("/", "_self");
            }}
          >
            View Parachain
          </Button>
        </div>
        <div className="grow"></div>
        <div className="p-4">
          <Image
            src={withBasePath("/assets/images/dashboard/dashboard-2.svg")}
            alt="parachains-logo"
            width={400}
            height={322}
          />
        </div>
      </div>
    </div>
  );
};

export default DeploySucceed;
