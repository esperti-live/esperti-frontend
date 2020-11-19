import Link from "next/link";
import styles from "../../styles/Footer.module.scss";

const Footer = () => {

  return (
    <footer className={styles.footer}>
      <Link href="/requests">View Requests</Link>
      <img src="/images/logo.svg" alt="Esperti.live" />
    </footer>
  );
};

export default Footer;
