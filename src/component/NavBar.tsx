import '../css/navbar.css'
import { handleLogout } from '../Handler/UserHandler';
import  { getUserCookie } from '../Handler/CookieHandler'

const NavBar = () => 
{
    return(
        <section id="nav">
            <div id="nav-left">
                <a>
                    <img src=""/>
                </a>
            </div>
                {
                (getUserCookie("authToken")) == "" ?  
                    <div id="nav-right">
                        <a href="./login">Login</a>
                        <a href="./register">Register</a>
                    </div>
                    :
                    <div id="nav-right">
                        <a href="./profile">{getUserCookie("name")}</a>
                        <a onClick={handleLogout}>Logout</a>
                    </div>
                }

        </section>
    )
}

export default NavBar