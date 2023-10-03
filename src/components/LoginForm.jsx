import '../css/LoginForm.css';
import { useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import login from '../services/login';

function LoginForm(props) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const makeLogin = (event) => {

        event.preventDefault();
        login(username, password).then(res => {
            console.log(res.data['token'])
            localStorage.setItem('username', username)
            localStorage.setItem('token', res.data['token'])
            props.loginState(username, password)
            history.push('/');
        })
        .catch(e => {
            console.log(e)
        })
    }

    return (
        <form className='login_form' onSubmit={makeLogin}>
        <div>
        <label>Nome de usuário</label>
          <input type='text' value={username} onChange={(e) => {setUsername(e.target.value)}}></input>
        </div>
        <div>
        <label>Senha</label>
          <input type='password' value={password} onChange={(e) => {setPassword(e.target.value)}}></input>
        </div>
            <input type='submit' value='Logar'></input>
      </form>
    );
}

export default LoginForm;