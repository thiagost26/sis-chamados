/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from 'react';
import { Link } from 'react-router-dom';

import logo from '../../assets/logo.png';


function SingUp() {

  const [ nome, setNome ] = useState('');
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
          <h1>Cadastro</h1>
          <input type="text" placeholder="Seu nome" value={nome} onChange={(e) => setNome(e.target.value)} />
          <input type="text" placeholder="email@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="*********" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit">Cadastrar</button>
        </form>

        <Link to="/" >Conta</Link>
        {/* <a href='/'>Já tem uma conta? Entre</a> */}
        
        
      </div>
    </div>
  );
}

export default SingUp;
