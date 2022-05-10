/* eslint-disable no-restricted-globals */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from 'react';

import { Link } from 'react-router-dom';

import './signin.css';
import logo from '../../assets/logo.png';


function SingIn() {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');


  function handleSubmit(e) {
    e.preventDefault();
    alert('CLICOU');
  }


  return (
    <div className="container-center">
      <div className="login">
        <div className="login-area">
          <img src={logo} alt="Sistema Logo" />
        </div>

        <form onSubmit={handleSubmit}>
          <h1>Entrar</h1>
          <input type="text" placeholder="email@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="*********" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit">Acessar</button>
        </form>


        <Link className="registro" to="/register">Criar uma conta</Link>
        {/* <a href='/register'>Criar uma conta</a> */}
        
        
      </div>
    </div>
  );
}

export default SingIn;
