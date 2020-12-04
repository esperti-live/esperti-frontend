import Link from "next/link";
import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import styles from "../../styles/components/Footer.module.scss";

const Footer = () => {
  const { user } = useContext(AuthContext);

  return (
    <footer className={styles.footer}>
      {user && user.type === "expert" ? (
        <Link href="/requests">View Requests</Link>
      ) : (
        <Link href="/my-requests">View Requests</Link>
      )}

      <img src="/images/logo.svg" alt="Esperti.live" />
    </footer>
  );
};

export default Footer;
