import Link from "next/link";
import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import styles from "../../styles/Footer.module.scss";

const Footer = () => {
  const { user } = useContext(AuthContext);
  console.log("user", user)
  
  //Todo if expert, show all
  //If ! expert show only mine

  return (
    <footer className={styles.footer}>
      <Link href="/requests">View Requests</Link>
      <img src="/images/logo.svg" alt="Esperti.live" />
    </footer>
  );
};

export default Footer;
