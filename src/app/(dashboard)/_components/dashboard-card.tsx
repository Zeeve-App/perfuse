import Link from "next/link";
import React from "react";
import { Card } from "@/lib/components/Card";
import { Heading } from "@/lib/components/Heading";
import SvgBubbles from "@/lib/icons/essential/outline/Bubbles";
import { Button } from "@/lib/components/Button";
import SvgArrow1Right from "@/lib/icons/arrows/outline/Arrow1Right";

const DashboardCard = ({
  title,
  description,
  Icon,
  href,
}: {
  title: string;
  description: string;
  href: string;
  Icon: React.ElementType;
}) => {
  return (
    <Card className={"col-span-12 flex-col rounded-lg md:col-span-6 lg:col-span-4 xl:col-span-3"}>
      <div className="flex flex-row items-center gap-3">
        <div className="rounded-lg bg-brand-outline p-2">
          <Icon />
          {/* <Image
            src={withBasePath("/assets/images/protocol/parachains-logo.svg")}
            alt="parachains-logo"
            width={24}
            height={24}
          /> */}
        </div>
        <div>
          <Heading as={"h5"}>{title}</Heading>
          {/* {networkId ? (
            <Tooltip text={networkId} placement={"top-start"}>
              <div className="flex items-center gap-2 text-xs text-brand-gray">
                ID: {toShortString(networkId)}
                <CopyButton text={networkId} />
              </div>
            </Tooltip>
          ) : (
            <div className="flex items-center gap-2 text-xs text-brand-gray">ID: NA</div>
          )} */}
        </div>
      </div>
      <div className="border-b pb-2">
        <div className="flex items-center justify-between py-1 text-xs">
          <div className="flex items-baseline gap-2">
            <SvgBubbles className="text-brand-primary" />
            <div className="text-brand-gray">{description}</div>
          </div>
        </div>
      </div>
      <Link href={href}>
        <Button className="w-full justify-start px-0" colorScheme="primary" variant={"text"}>
          Learn more <SvgArrow1Right />
        </Button>
      </Link>
    </Card>
  );
};

export { DashboardCard };
