import { NavSyntaxInterface } from "../Model/NavModel";

// For View Profile Button
const ViewProfileButton = {width: '75%', marginTop: '15px'};

// For all button font color
const buttonFontColor = "white";

// FOr all Delete Button
const DeleteButton = {color: buttonFontColor, backgroundColor: 'rgb(230, 0, 0)', '&:hover': {backgroundColor: 'rgb(210, 0, 0)'}}

// For all items/tables
const ItemToCenter = {display: 'flex', justifyContent: 'center'}

const PageItemToCenter = {...ItemToCenter, marginTop: 5};

// Navbar syntax
const NavColor = { background: "#00796B", word: buttonFontColor, wordHover: "#B2DFDB" };
const NavButtonTransition = "color 1s, background-color 1s";

const NavSyntax: NavSyntaxInterface = { fontSize: 24, transition: NavButtonTransition, bgcolor: NavColor.background, color: NavColor.word, '&:hover': { color: NavColor.wordHover } };
const MenuItemSyntax = { margin: 0, padding: 0 };

// For Avatar in Navbar
const AvatarSize = "42px";

// For all page title
const PageTitleSyntax = { fontSize: '32px', marginBottom: '3px' }

// For modal
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

const ModalSubTitleSyntax = 
{
    fontSize: '18px', 
    fontWeight: 'bold'
}

const ModalBodySyntax = 
{
    padding: '15px 10px 30px 10px',
    display: 'grid', 
    gap:"20px 50px"
}

const CreateModalSyntax = {width: '400px'}

export {ViewProfileButton, buttonFontColor, DeleteButton, ItemToCenter, PageItemToCenter, NavColor, NavButtonTransition, NavSyntax, AvatarSize, MenuItemSyntax, PageTitleSyntax, ModalTitleSyntax, ModalSubTitleSyntax, ModalSyntax, CreateModalSyntax, ModalBodySyntax}