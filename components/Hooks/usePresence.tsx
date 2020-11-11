import { useState, useEffect } from "react";
import { usePubNub } from "pubnub-react";

export const usePresence = (channel: string) => {
  const [onlineUsers, setOnlineUsers] = useState([]);

  const pubnub = usePubNub();

  /**
   * Checks which users are online every 10 seconds and
   * sets the ids of online users to onlineUsers array
   */

  useEffect(() => {
    const refreshInterval = setInterval(() => {
      pubnub.hereNow(
        {
          channels: [channel],
          includeUUIDs: true,
        },
        (_, response) => {
          if (response !== null) {
            const onlineUserIds = response.channels[channel].occupants.map(
              (onlineUser) => onlineUser.uuid
            );
            setOnlineUsers(onlineUserIds);
          }
        }
      );
    }, 10000);

    return () => {
      clearInterval(refreshInterval);
    };
  }, []);

  return [onlineUsers];
};
