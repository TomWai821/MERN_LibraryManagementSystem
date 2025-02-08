import { NavSyntaxInterface } from "../NavModel";

// Nav bar syntax
const NavColor = { background: "#00796B", word: "white", wordHover: "#B2DFDB" };
const NavButtonTransition = "color 1s, background-color 1s";

const NavSyntax: NavSyntaxInterface = { fontSize: 24, transition: NavButtonTransition, bgcolor: NavColor.background, color: NavColor.word, '&:hover': { color: NavColor.wordHover } };
const MenuItemSyntax = { m: 0, p: 0 };
const AvatarSize = "42px";

const PageTitleSyntax = { fontSize: '32px', marginBottom: '3px' }

const ModalSyntax = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    padding: '20px',
    borderRadius: '16px'
};

const ModalTitleSyntax = 
{ 
    fontSize: '24px', 
    marginBottom: '5px' 
}

const ModalBodySyntax = 
{
    padding: '15px 5px 30px 5px',
    display: 'grid', 
    gap:"20px 50px"
}

const CreateModalSyntax = {width: '400px', height: '400px'}

export {NavColor, NavButtonTransition, NavSyntax, AvatarSize, MenuItemSyntax, PageTitleSyntax, ModalTitleSyntax, ModalSyntax, CreateModalSyntax, ModalBodySyntax}