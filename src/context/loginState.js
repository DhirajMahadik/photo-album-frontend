import { useState } from "react"
import Context from "./Context"
import axios from "axios"

const LoginState = (props) =>{

    const [isLogin, setIsLogin] = useState(false)
    const [token,setToken] = useState(localStorage.getItem('auth_token'))
    const [collections, setCollections ] = useState([])
    const [images, setImages] = useState([])

    const getCollections = (Token) =>{
        axios({url:'http://127.0.0.1:5500/api/get-collection',method:'POST',headers:{"authorization":`bearer ${Token !== null ? JSON.parse(Token) : JSON.parse(token)}`}})
        .then((response)=>{
            setCollections(response.data)
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    const getRecentImages = (Token) =>{
        axios({url:'http://127.0.0.1:5500/api/get-images',method:'GET',headers:{"authorization":`bearer ${Token !== null ? JSON.parse(Token) : JSON.parse(token)}`}})
        .then((response)=>{
            setImages(response.data)
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    return(
        <Context.Provider value={{isLogin,setIsLogin,token,setToken,getCollections,getRecentImages,collections,images}}>
            {props.children}
        </Context.Provider>

    )
}

export default LoginState