import React from "react";
// import { IconNotificationBell2 } from "@zeeve-platform/icons/notification/outline";
// import { IconButton } from "@zeeve-platform/ui";
import { IconButton } from "../Button";
import { useNotificationsWebsocketContext } from "./NotificationsWebsocketContext";
import SvgNotificationBell1 from "@/lib/icons/notification/outline/NotificationBell1";

interface NotificationBellProps {
  handleOpen: () => void;
}

const NotificationBell = (props: NotificationBellProps) => {
  const { handleOpen } = props;

  const { notificationsCount, setNotificationsCount, webSocket } = useNotificationsWebsocketContext();

  const handleNotificationBellClicked = () => {
    handleOpen();

    if (webSocket.current?.OPEN) {
      webSocket.current?.send(
        JSON.stringify({
          Action: "Message",
          Type: "AllNotifications",
        }),
      );
      setNotificationsCount(0);
    }
  };

  return (
    <IconButton
      variant="text"
      className="relative p-0"
      colorScheme="dark"
      onClick={handleNotificationBellClicked}
      isRounded
    >
      {/* notification ping */}
      {notificationsCount > 0 && (
        <span className="absolute right-0 top-0 flex size-2.5">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex size-2.5 rounded-full bg-red-500"></span>
        </span>
      )}
      <SvgNotificationBell1 className="text-brand-dark-blue text-2xl" />
    </IconButton>
  );
};

export type { NotificationBellProps };
export { NotificationBell };
