import { OptionType } from "@/types/react-select";

const chainTypeOptions: OptionType[] = [
  {
    label: "Local",
    value: "Local",
  },
];

const versionOptions: OptionType[] = [{ value: "polkadot-v1.2.0", label: "polkadot-v1.2.0" }];

const relayChainTypeOptions: OptionType[] = [{ value: "rococo-local", label: "rococo-local" }];

export { chainTypeOptions, versionOptions, relayChainTypeOptions };
