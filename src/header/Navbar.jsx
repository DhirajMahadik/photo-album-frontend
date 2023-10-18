import {  useContext } from "react"
import { useNavigate } from "react-router-dom"
import Context from "../context/Context"


const Navbar = ({ setLoginPopUp }) => {

    const navigate = useNavigate()

    const login = useContext(Context)

    const logoutHandler = () => {
        login.setIsLogin(false)
        localStorage.removeItem('auth_token')
        navigate('/')
    }

    return (
        <nav className="navbar navbar-expand-lg bg-body-secondary navbar-light ">
            <div className="container">
                <span className="navbar-brand fw-bold" >My<span>Album</span></span>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse justify-content-end navbar-collapse" id="navbarNav">
                    
                    <div>
                        {!login.isLogin ? <button onClick={() => setLoginPopUp(true)} className="btn btn-success btn-sm">Login</button> : <button onClick={logoutHandler} className="btn btn-danger btn-sm">Logout</button>}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar