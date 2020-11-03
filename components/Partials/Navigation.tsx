import { useContext } from "react";
import styles from "../../styles/Navigation.module.scss";
import AuthContext from "../../contexts/AuthContext";
import Link from "next/link";

const Navigation = () => {
  const { user, userLoading } = useContext(AuthContext);

  return (
    <nav className={styles.navigation}>
      <div className={styles.innerNavigation}>
        <Link href="/">
          <a>
            <img src="/images/logo.svg" alt="Esperti" />
          </a>
        </Link>
        {user && (
          <Link href="/settings">
            <div className={styles.user}>
              <img src="/images/user_profile.svg" alt="Avatar" />
              <span>{user.email.split("@")[0]}</span>
            </div>
          </Link>
        )}
        {userLoading && <p className={styles.loginButton}>Loading profile</p>}
        {!user && !userLoading && (
          <Link href="/login">
            <a className={styles.loginButton}>
              Log In <img src="/images/arrow_right.svg" alt="log in" />
            </a>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
