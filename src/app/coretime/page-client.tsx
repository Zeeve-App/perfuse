"use client";
import { Card } from "@/lib/components/Card";
import { RegionXCard } from "./_components/regionX";
import { Heading } from "@/lib/components/Heading";

const CoreTimePageClient = () => {

  return (
    <Card>
      <Heading>
        CoreTime
      </Heading>
      <Card className="grid grid-cols-12 gap-3 rounded-lg bg-white p-3 lg:gap-6 lg:p-6">
        <RegionXCard protocolId={"123"} protocolName={"RegionX"} description={"this is the description"} />
      </Card>
    </Card>
  );
};

export default CoreTimePageClient;
