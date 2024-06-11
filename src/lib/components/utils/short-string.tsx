import { CopyButton } from "@/lib/components/Button";
import { Tooltip } from "@/lib/components/Tooltip";
import { toShortString } from "@/utils/helpers";

const ShortString = ({
  text,
  copyButton,
  startCharCount,
}: {
  text: string;
  copyButton?: boolean;
  startCharCount: number;
}) => {
  return text?.length && text.length > startCharCount ? (
    <Tooltip text={text} placement="top-start">
      <div className="flex items-center">
        <div className="mr-2">{toShortString(text, startCharCount)}</div>
        {copyButton && <CopyButton text={text} />}
      </div>
    </Tooltip>
  ) : (
    text
  );
};

export default ShortString;
