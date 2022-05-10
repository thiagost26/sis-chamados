import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import SingIn from './pages/SingIn';
import SingUp from "./pages/SingUp";
import Dashboard from "./pages/Dashboard";

const Rotas = () => {
    return(
        <Router>
            <Routes>
                <Route exact path="/" element={<SingIn/>}/>            
                <Route exact path="/register" element={<SingUp/>}/>
                <Route exact path="/dashboard" element={<Dashboard/>}/>
            </Routes>
        </Router>
    )
}

export default Rotas;