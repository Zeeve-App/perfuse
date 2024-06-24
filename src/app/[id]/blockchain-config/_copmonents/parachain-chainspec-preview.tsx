import SyntaxHighlighter from "react-syntax-highlighter";
import * as theme from "react-syntax-highlighter/dist/esm/styles/prism";
import { ChainSpecFileType } from "@/types/chain-spec";

export default function ParachainChainSpecPrev({ data }: { data?: ChainSpecFileType }) {
  return (
    <SyntaxHighlighter
      customStyle={{
        fontSize: "12px",
        backgroundColor: "transparent",
        padding: "0",
        margin: "0",
      }}
      language="json"
      style={theme.solarizedlight}
    >
      {JSON.stringify(data, null, 4)}
    </SyntaxHighlighter>
  );
}
