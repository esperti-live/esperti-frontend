import { createContext } from "react";
import { Notification } from "../ts/interfaces";

interface NotificationContext {
  notifications: Notification[];
  refreshNotifications: () => void;
  addNotificationListener: () => void;
  addNotification: (receiverChannel: string, channel: string) => void;
  notificationCount: number;
}

const NotificationContext = createContext({} as NotificationContext);

export default NotificationContext;
