import {useState, useContext} from 'react'
import AuthContext from '../contexts/AuthContext';

export default function login() {
  const [emailInput, setEmailInput] = useState<string>('');
  const {login} = useContext(AuthContext);

  const loginHandler = () => {
    console.log('logging in', emailInput);
    login(emailInput);
  }


  return (
    <div>
      login page
      <input type="email" required onChange={(e) => setEmailInput(e.target.value)} />
      <button type="button" onClick={loginHandler}>Login</button>
    </div>
  )
}
