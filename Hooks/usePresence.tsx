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
    fetchOnlineUsers();
    const refreshInterval = setInterval(fetchOnlineUsers, 10000);

    return () => {
      clearInterval(refreshInterval);
    };
  }, []);

  const fetchOnlineUsers = () => {
    pubnub.hereNow(
      {
        channels: [channel],
        includeUUIDs: true,
      },
      (_, response) => {
        if (response !== null) {
          try{
            const onlineUserIds = response.channels[channel].occupants.map(
              (onlineUser) => onlineUser.uuid
            );
            setOnlineUsers(onlineUserIds);
          } catch (err) {

          }
        }
      }
    );
  };

  return [onlineUsers];
};
