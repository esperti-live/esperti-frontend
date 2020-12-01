import { createContext } from "react";
import { Notification } from "../ts/interfaces";

interface NotificationContext {
  notifications: Notification[];
  addNotification: (channel: string, message: string) => void;
  notificationCount: number;
  loadNotifications: () => void;
}

const NotificationContext = createContext({} as NotificationContext);

export default NotificationContext;
