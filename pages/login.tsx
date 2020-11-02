import Link from "next/link";
import LoginForm from "../components/Auth/LoginForm";
import styles from "../styles/Auth.module.scss";

export default function login() {
  return (
    <div className={styles.login}>
      <h2>Log In</h2>
      <LoginForm />
    </div>
  );
}
