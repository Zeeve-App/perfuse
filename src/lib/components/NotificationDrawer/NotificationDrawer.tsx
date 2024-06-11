import React, { useEffect, useState } from "react";
// import {
//     SideDrawer,
//     SideDrawerOverlay,
//     SideDrawerContent,
//     SideDrawerHeader,
//     SideDrawerTitle,
//     SideDrawerCloseButton,
//     SideDrawerBody,
// } from "@zeeve-platform/ui";
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

interface NotificationDrawerProps {
  isOpen: boolean;
  handleClose: () => void;
}

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
