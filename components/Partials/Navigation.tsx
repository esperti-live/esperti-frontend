import { useContext } from "react";
import styles from "../../styles/Navigation.module.scss";
import AuthContext from "../../contexts/AuthContext";
import Link from "next/link";

const Navigation = () => {
  const { user } = useContext(AuthContext);

  console.log(user);
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
              <span>{user.name}</span>
            </div>
          </Link>
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
  );
};

export default Navigation;
