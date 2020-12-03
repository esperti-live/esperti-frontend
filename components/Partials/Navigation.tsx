import { useContext, useState } from "react";
import Link from "next/link";

import AuthContext from "../../contexts/AuthContext";

import NotificationContext from "../../contexts/NotificationContext";
import SettingsModal from "../Modal/SettingsModal";
import styles from "../../styles/Navigation.module.scss";

const Navigation = () => {
  const { user } = useContext(AuthContext);
  const { notificationCount } = useContext(NotificationContext);
  const [showSettings, setShowModal] = useState(false);

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
              <button onClick={() => setShowModal(true)}>
                <div title={String(user.id)} className={styles.user}>
                  <img src="/images/profile-user.svg" alt={user.name} />
                </div>
              </button>

              <Link href="/messages">
                <a>
                  {notificationCount < 1 && (
                    <img src="/images/chat-icon.svg" alt={`No notifications`} />
                  )}
                  {notificationCount > 0 && (
                    <>
                      <img
                        src="/images/chat-notification.svg"
                        alt={`${notificationCount} notifications`}
                      />
                      <span className={styles.chatIconNotification}></span>
                    </>
                  )}
                </a>
              </Link>
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
      {showSettings && <SettingsModal closeModal={() => setShowModal(false)} />}
    </>
  );
};

export default Navigation;
