import { useContext, useEffect, useState } from "react";
import Link from "next/link";

import AuthContext from "../../contexts/AuthContext";

import UnreadMessagesModal from "../Modal/UnreadMessagesModal";
import NotificationContext from "../../contexts/NotificationContext";

import styles from "../../styles/Navigation.module.scss";

const Navigation = () => {
  const [viewMessagesModal, setViewMessagesModal] = useState(false);

  const { user } = useContext(AuthContext);
  const {
    notifications,
    refreshNotifications,
    addNotificationListener,
  } = useContext(NotificationContext);

  useEffect(() => {
    if (user && user.id) {
      console.log("refreshing notifications");
      refreshNotifications();
    }
  }, [user]);

  useEffect(() => addNotificationListener(), []);

  return (
    <>
      <nav className={styles.navigation}>
        <div className={styles.innerNavigation}>
          <Link href="/">
            <a>
              <img src="/images/logo.svg" alt="Esperti" />
            </a>
          </Link>
          {user && (
            <div className={styles.userContainer}>
              <Link href="/settings">
                <div className={styles.user}>
                  <img src="/images/user_profile.svg" alt="Avatar" />
                  <span>{user.name}</span>
                </div>
              </Link>
              {notifications.length > 0 && (
                <button onClick={() => setViewMessagesModal(true)}>
                  {notifications.length}
                </button>
              )}
            </div>
          )}
          {!user && (
            <Link href="/login">
              <a className={styles.loginButton}>
                Log In <img src="/images/arrow_right.svg" alt="log in" />
              </a>
            </Link>
          )}
        </div>
      </nav>
      {viewMessagesModal && (
        <UnreadMessagesModal
          closeModal={() => setViewMessagesModal(false)}
          notifications={notifications}
        />
      )}
    </>
  );
};

export default Navigation;
