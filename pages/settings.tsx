import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import AuthContext from "../contexts/AuthContext";
import styles from "../styles/Auth.module.scss";

export default function login() {
  const { logout, user } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/");
    }
  }, []);

  const logoutHandler = () => {
    logout();
    router.replace("/");
  };

  return (
    <div className={styles.settings}>
      {user && !user.slug && (
        <Link href="/create-profile">
          <a>Create profile</a>
        </Link>
      )}
      <button type="button" onClick={logoutHandler}>
        Logout
      </button>
    </div>
  );
}
