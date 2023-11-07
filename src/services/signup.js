import axios from 'axios';

function signup(nomeSobrenome, email, username, password){

    return axios.post(
        'http://localhost:8000/api/signup/', {
        nomeSobrenome: nomeSobrenome,
        email: email,    
        username: username, 
            password: password})

}

export default signup