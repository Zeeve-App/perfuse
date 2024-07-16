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

import React, { createContext, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useToast } from "../Toast";
import { Count, Data, Notification } from "./types";

interface NotificationsWebSocketContextProps {
  children: React.ReactNode;
  url: string | undefined;
}

const NotificationsWebSocketContext = createContext<{
  webSocket: React.MutableRefObject<WebSocket | null>;
  notificationsCount: number;
  notifications: Notification[];
  setNotificationsCount: React.Dispatch<React.SetStateAction<number>>;
  setNotifications: React.Dispatch<React.SetStateAction<Notification[]>>;
} | null>(null);
NotificationsWebSocketContext.displayName = "NotificationsWebSocketContext";

const NotificationsWebSocketContextConsumer = NotificationsWebSocketContext.Consumer;
const NotificationsWebSocketContextProvider = (props: NotificationsWebSocketContextProps) => {
  const { url, children } = props;

  const webSocket = useRef<WebSocket | null>(null);

  const [notificationsCount, setNotificationsCount] = useState<number>(0);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const toast = useToast();

  const onMessage = useCallback(
    (event: MessageEvent) => {
      try {
        const response = JSON.parse(event.data) as Data;

        if (response.Action === "Message") {
          switch (response.Type) {
            case "Count": {
              const { count } = response.Details.data as Count;
              setNotificationsCount(count);
              return;
            }
            case "Toast": {
              const data = response.Details.data as Notification;
              toast(data.heading, {
                status: data.level,
                message: data.description,
              });
              return;
            }
            case "AppNotification": {
              const data = response.Details.data as Notification[];
              if (data.length) {
                setNotifications(data);
              }
              return;
            }
            default:
              console.log("Invalid action type");
              return;
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    [toast],
  );

  useEffect(() => {
    // url will be undefined in case of local development
    if (url === undefined) {
      return;
    }

    webSocket.current = new WebSocket(url);

    webSocket.current.onopen = () => {
      console.log("websocket opened");
    };

    webSocket.current.onclose = () => {
      setTimeout(() => {
        webSocket.current = new WebSocket(url);
      }, 1000);
    };

    const wsCurrent = webSocket.current;

    webSocket.current.onerror = (err: Event) => {
      console.log("Socket encountered error: ", err.timeStamp, "Closing socket");
      wsCurrent.close();
    };

    return () => {
      wsCurrent.close();
    };
  }, [url]);

  useEffect(() => {
    if (!webSocket.current) return;

    webSocket.current.onmessage = onMessage;
  }, [onMessage]);

  const values = useMemo(() => {
    return {
      webSocket,
      notificationsCount,
      notifications,
      setNotifications,
      setNotificationsCount,
    };
  }, [webSocket, notifications, notificationsCount, setNotifications, setNotificationsCount]);

  return <NotificationsWebSocketContext.Provider value={values}>{children}</NotificationsWebSocketContext.Provider>;
};

export type { NotificationsWebSocketContextProps };
export { NotificationsWebSocketContext, NotificationsWebSocketContextConsumer, NotificationsWebSocketContextProvider };
