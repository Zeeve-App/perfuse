type Count = {
  count: number;
};

type Notification = {
  heading: string;
  description: string;
  level: "success" | "error" | "info" | "warning";
  redirection?: {
    newTab: boolean;
    URL: string;
  };
  read: boolean;
  createdAt: string;
};

type Data = {
  Action: "Message";
  Type: "Count" | "Toast" | "AppNotification";
  Details: {
    id: string;
    data: Count | Notification | Notification[];
  };
};

export type { Count, Notification, Data };
