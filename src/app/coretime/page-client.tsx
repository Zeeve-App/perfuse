"use client";
import { RegionXCard } from "./_components/regionX";
import { Card } from "@/lib/components/Card";
import { Heading } from "@/lib/components/Heading";

const CoreTimePageClient = () => {
  return (
    <Card className="shadow-brand-shadow ">
      <Heading as="h4">CoreTime</Heading>
      <div className="grid grid-cols-12 gap-3 rounded-lg bg-white lg:gap-6">
        <RegionXCard protocolId={"123"} protocolName={"RegionX"} description={"this is the description"} />
      </div>
    </Card>
  );
};

export default CoreTimePageClient;
