import { Routes, Route } from "react-router-dom"

// Another Pages
import LoginPage from "../Pages/LoginPage"
import MainPage from "../Pages/MainPage"
import RegisterPage from "../Pages/RegisterPage"
import BookPage from "../Pages/TablePages/BookPage"
import UserPage from "../Pages/TablePages/UserPage"
import ViewProfilePage from "../Pages/ViewProfilePage"
import DefinitionPage from "../Pages/TablePages/DefinitionPage"
import SelfLoanRecordPage from "../Pages/TablePages/SelfRecordPage"

import ContactPage from "../Pages/TablePages/ContactPage"

const RoutesList = () => 
{
    return(
        <Routes>
            <Route path="/" element={<MainPage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
            <Route path="/profile" element={<ViewProfilePage/>}/>
            <Route path="/viewBook" element={<BookPage/>}/>
            <Route path="/viewUser" element={<UserPage/>}/>
            <Route path="/records" element={<SelfLoanRecordPage/>}/>
            <Route path="/defination" element={<DefinitionPage/>}/>
            <Route path="/contact" element={<ContactPage/>}/>
        </Routes>
    )
    
}

export default RoutesList