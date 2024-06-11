import { useContext } from "react";
import { NotificationsWebSocketContext } from "./NotificationsWebSocketProvider";

const useNotificationsWebsocketContext = () => {
  const context = useContext(NotificationsWebSocketContext);
  if (!context) {
    throw new Error("useNotificationsWebsocketContext must be used within NotificationsWebSocketContextProvider");
  }

  return context;
};

export { useNotificationsWebsocketContext };
