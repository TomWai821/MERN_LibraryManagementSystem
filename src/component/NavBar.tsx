import '../css/navbar.css'
import { handleLogout } from '../Handler/UserHandler';
import  { getUserCookie } from '../Handler/CookieHandler'

const NavBar = () => 
{
    const isLoggedIn = (getUserCookie("authToken")) == "";
    const username = getUserCookie("name");

    return(
        <section id="nav">
            <div id="nav-left">
                <a>
                    <img src=""/>
                </a>
            </div>
                {isLoggedIn ?  
                    <div id="nav-right">
                        <a href="./login">Login</a>
                        <a href="./register">Register</a>
                    </div>
                    :
                    <div id="nav-right">
                        <a href="./profile">{username}</a>
                        <a onClick={handleLogout}>Logout</a>
                    </div>
                }

        </section>
    )
}

export default NavBar