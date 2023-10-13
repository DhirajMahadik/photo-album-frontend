import { useEffect, useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import Context from "../context/Context"


const Navbar = ({ setLoginPopUp }) => {

    const navigate = useNavigate()

    const login = useContext(Context)

    const logoutHandler = () => {
        login.setIsLogin(false)
        login.setToken(false)
        localStorage.removeItem('auth_token')
        navigate('/')
    }

    return (
        <nav className="navbar navbar-expand-lg bg-body-secondary navbar-light ">
            <div className="container">
                <a className="navbar-brand fw-bold" href="#">My<span>Album</span></a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse justify-content-end navbar-collapse" id="navbarNav">
                    {/* <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link text-light"  href="#">Home</a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-light" href="#">Features</a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-light" href="#">Pricing</a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-light">Disabled</a>
        </li>
      </ul> */}
                    <div>
                        {!login.isLogin ? <button onClick={() => setLoginPopUp(true)} className="btn btn-success btn-sm">Login</button> : <button onClick={logoutHandler} className="btn btn-danger btn-sm">Logout</button>}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar