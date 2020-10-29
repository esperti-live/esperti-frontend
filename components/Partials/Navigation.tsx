import {useContext} from 'react';
import styles from '../../styles/Navigation.module.scss';
import AuthContext from '../../contexts/AuthContext';
import Link from 'next/link';

const Navigation = () => {
  const {user, logout} = useContext(AuthContext);

    const logoutHandler = () =>{
    logout();
  }

  return (
    <nav className={styles.navigation}>
     <div className={styles.innerNavigation}>
        
          <Link href='/'><a>Esperti</a></Link>
          {user && (<div><span>{user.email}</span><button type="button" onClick={logoutHandler}>Logout</button></div>)}
          {!user && <Link href='/login'><a>Login</a></Link>}
     </div>
    </nav>
  );
}

export default Navigation;
