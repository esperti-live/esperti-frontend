import LoginForm from "../components/Auth/LoginForm";
import styles from "../styles/pages/Login.module.scss";

export default function login() {
  return (
    <div className={styles.login}>
      <h2>Log In</h2>
      <LoginForm />
    </div>
  );
}
