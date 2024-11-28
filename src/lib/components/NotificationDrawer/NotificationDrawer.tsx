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

import React, { useEffect, useState } from "react";
import {
  SideDrawer,
  SideDrawerBody,
  SideDrawerCloseButton,
  SideDrawerContent,
  SideDrawerHeader,
  SideDrawerOverlay,
  SideDrawerTitle,
} from "../SideDrawer";
import { NotificationCard } from "./NotificationCard";
import { NotificationsLoadingSkeleton } from "./NotificationsLoadingSkeleton";
import { useNotificationsWebsocketContext } from "./NotificationsWebsocketContext";
import { Notification } from "./types";

/** notification drawer props */
interface NotificationDrawerProps {
  isOpen: boolean;
  handleClose: () => void;
}

/** notification drawer component */
const NotificationDrawer = (props: NotificationDrawerProps) => {
  const { isOpen, handleClose } = props;
  const { notifications } = useNotificationsWebsocketContext();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (notifications.length) {
      setIsLoading(false);
    }
  }, [notifications]);

  return (
    <SideDrawer isOpen={isOpen} handleClose={handleClose} placement="right">
      <SideDrawerOverlay />
      <SideDrawerContent>
        <SideDrawerHeader className="z-10">
          <SideDrawerTitle className="text-[22px] font-semibold leading-[30px]">Notifications</SideDrawerTitle>
          <SideDrawerCloseButton onClick={handleClose} />
        </SideDrawerHeader>
        <SideDrawerBody className="p-0">
          {isLoading && notifications.length === 0 ? (
            Array.from({ length: 10 }, (_, index) => {
              return <NotificationsLoadingSkeleton key={index} />;
            })
          ) : (
            <>
              {notifications.length &&
                notifications.map((item: Notification, index: number) => <NotificationCard key={index} item={item} />)}
            </>
          )}
        </SideDrawerBody>
      </SideDrawerContent>
    </SideDrawer>
  );
};

export type { NotificationDrawerProps };
export { NotificationDrawer };
