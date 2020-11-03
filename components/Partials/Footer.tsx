import Link from "next/link";
// import { useContext } from "react";
// import AuthContext from "../../contexts/AuthContext";
import styles from "../../styles/Footer.module.scss";

const Footer = () => {
  // const { user } = useContext(AuthContext);

  return (
    <footer className={styles.footer}>
      <Link href="/requests">View Requests</Link>
      {/* {user && !user.slug && (
        <Link href="/create-profile">
          <a>
            <span>Create profile</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12.017"
              height="6.008"
              viewBox="0 0 12.017 6.008"
            >
              <path
                d="M8.481 104.728a.751.751 0 1 0 1.062 1.062l2.253-2.253q.026-.026.05-.055l.019-.026.024-.033.019-.032.018-.031.016-.034.015-.033.012-.033.013-.036.009-.034c.003-.012.007-.025.009-.038s0-.026.006-.039 0-.022 0-.033v-.073-.073-.033c0-.011 0-.026-.006-.04s-.006-.025-.009-.037-.005-.023-.009-.034l-.012-.036-.012-.034c-.004-.011-.01-.022-.015-.032l-.017-.034-.018-.03-.02-.033-.023-.032-.02-.027q-.022-.027-.047-.052l-2.253-2.253a.751.751 0 1 0-1.062 1.062l.971.971H.751a.751.751 0 0 0 0 1.5h8.7z"
                transform="translate(0 -100.002)"
              />
            </svg>
          </a>
        </Link>
      )} */}
      <img src="/images/logo.svg" alt="Esperti.live" />
    </footer>
  );
};

export default Footer;
