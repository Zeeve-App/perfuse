/**
 * SPDX-License-Identifier: AGPL-3.0-or-later
 * Copyright (C) 2024 [Perfuse]
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

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
