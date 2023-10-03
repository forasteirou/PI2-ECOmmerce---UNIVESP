import '../css/Header.css';

function LogoutButton(props) {

    function logout(){
        localStorage.setItem('token', '');
        localStorage.setItem('username', '');
        console.log(props)
        props.logoutState();
    }

    return (
        <button 
        className="header-item btn"
        onClick={logout}>Logout
        </button>
    );
}

export default LogoutButton;