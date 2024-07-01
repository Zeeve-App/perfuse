"use client";
import Image from "next/image";
import Link from "next/link";
import { withBasePath } from "@/utils/helpers";
import { Heading } from "@/lib/components/Heading";
import { Button } from "@/lib/components/Button";

const DeploySucceed = () => {
  // localStorage.setItem("from", "parachains");

  return (
    <div className="flex flex-col gap-y-3 lg:gap-y-6">
      <div className="bg-brand-gradient-blue grid grid-cols-12 justify-items-center gap-4 rounded-lg border border-brand-outline p-3 lg:p-6">
        <div className="col-span-6 flex flex-col items-start justify-center gap-2">
          <Heading as="h3" className="text-white">
            Deploy New Parachain
          </Heading>
          <p className="text-white">There are no deployed parachains!</p>
          <Link href={"/create"}>
            <Button colorScheme={"light"} className="text-brand-blue">
              Begin Now
            </Button>
          </Link>
        </div>
        <div className="col-span-6">
          <Image
            src={withBasePath("/assets/images/dashboard/dashboard-1.svg")}
            alt="parachains-logo"
            width={425}
            height={322}
          />
        </div>
      </div>
    </div>
  );
};

export default DeploySucceed;
