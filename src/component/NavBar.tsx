import { handleLogout } from '../Handler/UserHandler';
import  { getUserCookie } from '../Handler/CookieHandler'
import { AppBar, Box, Button, Toolbar } from '@mui/material';

const NavBar = () => 
{
    const settings = ['', '', ''];
    const managePage = ['User', 'Book'];

    // css color for navbar
    const Color = { background:"#00796B", word: "white",  wordHover: "#B2DFDB" };
    const Transition = "color 1s, background-color 1s";

    const isLoggedIn = (getUserCookie("authToken")) !== "";

    const username = getUserCookie("name");
    const role = getUserCookie("role");

    return(
        <AppBar position="static" sx={{ bgcolor: Color.background }}>
            <Toolbar>
                <Box>
                    <Button sx={{ fontSize: 36, mr: 3, bgcolor: Color.background, color: Color.word }}>Library</Button>
                </Box>
                {isLoggedIn ?  
                    <Box sx={{ flexGrow: 1 }}>
                        <Button sx={{ fontSize: 24, bgcolor: Color.background, color: Color.word}}></Button>
                    </Box>
                    :
                    <Box sx={{ flexGrow: 1 }}>
                        <Button sx={{ fontSize: 24, transition: Transition, bgcolor: Color.background, color: Color.word, '&:hover': { color: Color.wordHover } }} href="./BookManagement">ViewBooks</Button>
                    </Box>
                }
                       
                {isLoggedIn ?  
                    <Box>
                        
                    </Box>
                    :
                    <Box>
                        <Button sx={{ fontSize: 24, mr: 3 , transition: Transition, bgcolor: Color.background, color: Color.word, '&:hover': { color: Color.wordHover } }} href="./login">Login</Button>
                        <Button sx={{ fontSize: 24, transition: Transition, bgcolor: Color.background, color: Color.word, '&:hover': { color: Color.wordHover } }} href="./register">Register</Button>
                    </Box>
                }
            </Toolbar>
        </AppBar>
    )
}

export default NavBar