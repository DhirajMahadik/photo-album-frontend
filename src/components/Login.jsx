import axios from 'axios'
import { useEffect, useState, useContext } from 'react'
import { CiCircleRemove } from 'react-icons/ci'
import { useNavigate } from 'react-router-dom'
import Context from '../context/Context'

const Login = ({ setLoginPopUp }) => {

    const [data, setData] = useState({ email: '', password: '' })
    const [signUpdata, setSignUpdata] = useState({ email: '', password: '', confirmP:'' })
    const [type, setType] = useState('login')

    const navigate = useNavigate()
    const user = useContext(Context)

    const SignInHandler = (e) => {
        e.preventDefault();
        axios.post('http://127.0.0.1:5500/api/auth/login', data)
            .then((response) => {
                localStorage.setItem('auth_token', JSON.stringify(response.data.token))
                user.setIsLogin(true)
                setData({ email: '', password: '' })
                user.getCollections(JSON.stringify(response.data.token))
                user.getRecentImages(JSON.stringify(response.data.token))
                setLoginPopUp(false)
                navigate('/')
            }).catch((error) => {
                
            })
    }

    const SignUpHandler = (e) =>{
        e.preventDefault();
        if(signUpdata.password === signUpdata.confirmP){
            axios.post('http://127.0.0.1:5500/api/auth/register', signUpdata)
            .then((response) => {
                setSignUpdata({ email: '', password: '', confirmP:'' })
                setType('login')

            }).catch((error) => {
              
            })
        }else{
            alert('password not matched')
        }
        
    }

    const onchangeHanderSignIn = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const onchangeHanderSignUp = (e) => {
        setSignUpdata({ ...signUpdata, [e.target.name]: e.target.value })
    }

    useEffect(()=>{
        document.body.style.overflow ='hidden'
        return()=>{
            document.body.style.overflow =''
        }
    })

    return (
        <>
            {type === 'login' ? <div className='container-fluid position-absolute d-flex z-1 ' style={{ height: '100vh', backgroundColor: '#00000099' }}>
                <div className="d-flex p-3 flex-column bg-light m-auto position-sticky bg-secondary" style={{ height: '350px', width: '400px', borderRadius: '10px' }}>
                    <div className='d-flex justify-content-end'><CiCircleRemove role='button' onClick={() => setLoginPopUp(false)} size={25} /></div>
                    <form className='m-auto w-75' onSubmit={SignInHandler}>
                        <div className="d-flex justify-content-center py-2">
                            {/* <PersonCircle  size={35}/> */}
                        </div>
                        <div className="py-2">
                            <label className='form-lable' htmlFor="email">Email</label>
                            <input required className='form-control' type="text" name='email' id='email' value={data.email} onChange={onchangeHanderSignIn} />
                        </div>
                        <div className="py-2">
                            <label className='form-lable' htmlFor="password">Password</label>
                            <input required className='form-control' type="password" name='password' id='password' value={data.password} onChange={onchangeHanderSignIn} />
                        </div>
                        <div className="d-flex flex-column justify-content-center align-items-center py-2">
                            <button type="submit" className='btn btn-success my-2' > Sing IN</button>
                            <span onClick={()=>setType('register')}><u>Sign Up</u></span>
                        </div>
                    </form>
                </div>
            </div> :
                <div className='container-fluid position-absolute d-flex z-1' style={{ height: '100vh', backgroundColor: '#00000099' }}>
                    <div className="d-flex p-3 flex-column bg-light m-auto position-sticky bg-secondary" style={{ height: '400px', width: '400px', borderRadius: '10px' }}>
                        <div className='d-flex justify-content-end'><CiCircleRemove role='button' onClick={() => setLoginPopUp(false)} size={25} /></div>
                        <form className='m-auto w-75' onSubmit={SignUpHandler}>
                            <div className="d-flex justify-content-center py-2">
                                {/* <PersonCircle  size={35}/> */}
                            </div>
                            <div className="py-2">
                                <label className='form-lable' htmlFor="email">Email</label>
                                <input required className='form-control' type="text" name='email' id='email' value={signUpdata.email} onChange={onchangeHanderSignUp} />
                            </div>
                            <div className="py-2">
                                <label className='form-lable' htmlFor="confirmP">Password</label>
                                <input required className='form-control' type="password" name='password' id='confirmP' value={signUpdata.password} onChange={onchangeHanderSignUp} />
                            </div>
                            <div className="py-2">
                            <label className='form-lable' htmlFor="password">Confirm Password</label>
                            <input required className='form-control' type="password" name='confirmP' id='password' value={signUpdata.confirmP} onChange={onchangeHanderSignUp} />
                        </div>
                            <div className="d-flex flex-column justify-content-center align-items-center py-2">
                                <button type="submit" className='btn btn-success my-2' >Sign Up</button>
                                <span className='nav-link' onClick={()=>setType('login')}> <u>Sign In</u></span>
                            </div>
                        </form>
                    </div>
                </div>
            }

        </>
    )
}

export default Login