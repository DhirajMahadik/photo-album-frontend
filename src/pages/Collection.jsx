import axios from 'axios'
import { useEffect, useState, useContext } from 'react'
import {BiImageAdd} from 'react-icons/bi'
import {RiArrowGoBackFill} from 'react-icons/ri'
import { useNavigate, useParams } from 'react-router-dom'
import Context from '../context/Context'
import ImagePopUp from '../components/ImagePopUp'


const Collection = () => {

    const [images, setImages] = useState([])
    const [previewImage, setPreviewImage] = useState('')
    let token = localStorage.getItem('auth_token')

    const user = useContext(Context)

    const navigate = useNavigate()

    const [imgPop , setImgPop] = useState(false)

    const {collection_id,collection_name} = useParams()

    const getCollectionImages = () =>{
        axios({url:`http://127.0.0.1:5500/api/get-collection-images/${collection_id}`,method:'GET',headers:{'authorization':`bearer ${JSON.parse(token)}`}})
        .then((response)=>{
            setImages(response.data)
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    const addImg = (e) =>{
        console.log(e)
        let data = {image:e.target.files[0]}
        let formData = new FormData()
        for( let key of Object.keys(data)){
            formData.append(key,data[key])
        }
        axios({url:`http://127.0.0.1:5500/api/add-image/${collection_id}`,data:formData , method:'POST' , headers:{'authorization':`bearer ${JSON.parse(token)}`}})
        .then((response)=>{
            console.log(response)
            getCollectionImages()
        }).catch((error)=>{
            console.log(error)
        })

    }

    const imagePreview = (url) =>{
        setPreviewImage(url)
        setImgPop(true)
    }

    useEffect(()=>{
        if(token) {
            getCollectionImages()
            user.setIsLogin(true)
        }else{
            navigate('/')
        }
      
    // eslint-disable-next-line
    },[])  

    return (
        <>
        {imgPop && <ImagePopUp image={previewImage}  close={()=>setImgPop(false)}/>}
        <div className='mx-4 my-2'>
           <RiArrowGoBackFill role='button' onClick={()=>navigate('/')} size={20}/>
        </div>
        <div className='container mb-4 mt-2'>
            <div className='d-flex'>
            <div className=' mx-auto my-2'>
                    <h4>{collection_name}</h4>
                </div>
            </div>
            <div className='d-flex flex-wrap justify-content-around'>
                <div className='my-2'>
                    <form >
                        <label htmlFor='add' className='btn btn-outline-warning btn-sm'  > <BiImageAdd size={20}/> ADD</label>
                        <input onChange={addImg} type="file" id='add' className='d-none' />
                    </form>
                </div>
                <div className='my-2'>
                    <button className='btn btn-outline-danger btn-sm'>Delete Collection</button>
                </div>
            </div>
        </div>

        <div className="container border p-4">
        <div className='row d-flex justify-content-center  border   p-2'>
                   
                   {
                    images.length >= 1 ? images.map((element, index)=>{
                            return  <div key={index} onClick={()=>imagePreview(element.image_url)} className="col-md-3 col-6 p-2 " style={{maxHeight:"250px", maxWidth:"250px"}}>
                            <img style={{height:"100%", width:"100%"}} src={element.image_url} className='img-fluid  w-100 mx-auto mb-2' alt="" />
                            </div>
                    }): <div className="col-md-3 col-6 p-2 " style={{maxHeight:"250px", maxWidth:"250px"}}>
                            <h6 className='text-center'>No images found in this collection</h6>
                    </div>
                   }
                  
            </div>
        </div>  
        </>
    )
}

export default Collection