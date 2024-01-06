import '../css/SignupForm.css';
import signup from '../services/signup';
import { useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function SignupForm(){

  const [nomeSobrenome, setNomeSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [pwdConfirm, setPwdConfirm] = useState('');
  const history = useHistory();

  const senhasConferem = () => {
    if (password == pwdConfirm) {
      return true
    }
    else {
      return false
    }
  }


  const makeSignup = (event) => {
    event.preventDefault()
    if (senhasConferem()) {
      signup(nomeSobrenome, email, username,password).then(res => {
        alert('cadastro efetuado com sucesso!')
        history.push('/')
      })
      .catch(e => {

        let errorMessage = e.response.data.error

        if (errorMessage == 'username error'){
          alert('Já existe um usuário cadastrado com esse nome. Escolha outro nome de usuário')
        }
        if (errorMessage == 'email error'){
          alert('Já existe um usuário cadastrado com esse email.')
        }

      })
    } else {
      alert('As senhas digitadas são diferentes. Tente novamente.')
    }
  }


  return (

    <form className='signup_form' onSubmit={makeSignup}>
    <p>Formulário de cadastro</p>

    <div> 
    <label>Nome completo</label>
      <input type='text' value={nomeSobrenome} onChange={(e) => {setNomeSobrenome(e.target.value)}} ></input>
    </div>
    <div> 
    <label>Email:</label>
      <input type='text' value={email} onChange={(e) => {setEmail(e.target.value)}}></input>
    </div>  
    <div> 
    <label>Nome de usuário</label>
      <input type='text' value={username} onChange={(e) => {setUsername(e.target.value)}}></input>
    </div>
    <div>
    <label>Senha</label>
      <input type='password' value={password} onChange={(e) => {setPassword(e.target.value)}}></input>
    </div>
    <div>
    <label>Digite novamente a senha</label>
      <input type='password' value={pwdConfirm} onChange={(e) => {setPwdConfirm(e.target.value)}}></input>
    </div>
        <input type='submit' value='Enviar'></input>
  </form>
  )

}


/*
function SignupForm() {

    return (
        <form className='signup_form'>

        <p>Formulário de cadastro</p>

        <div> 
        <label>Nome completo</label>
          <input type='text'></input>
        </div>
        <div> 
        <label>Email:</label>
          <input type='text'></input>
        </div>      
        <div> 
        <label>Nome de usuário</label>
          <input type='text'></input>
        </div>
        <div>
        <label>Senha</label>
          <input type='password'></input>
        </div>
        <div>
        <label>Digite novamente a senha</label>
          <input type='password'></input>
        </div>
            <input type='submit' value='Enviar'></input>
      </form>
    );
}*/


export default SignupForm;