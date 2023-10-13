import {FcFolder} from 'react-icons/fc'
import {FaFolderPlus} from 'react-icons/fa'
import {CiCircleRemove} from 'react-icons/ci'
import ImagePopUp from '../components/ImagePopUp'
import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Context from '../context/Context'
import axios from 'axios'

const Dashboard = () => {

    const [imgPop , setImgPop] = useState(false)
    const [addCollectionPop , setAddCollectionPop] = useState(false)
    const [collection_name , setCollection_name] = useState('');
    // const [collections, setCollections ] = useState([])
    // const [images, setImages] = useState([])
    const [previewImage, setPreviewImage] = useState('') 
    const user = useContext(Context)
    const navigate = useNavigate()

    const addCollectionHandler = () =>{
        if(collection_name !== ''){
            axios({url:'http://127.0.0.1:5500/api/add-collection',method:'POST' ,data:{collection_name}, headers:{'authorization':`bearer ${JSON.parse(user.token)}`}})
            .then((response)=>{
                console.log(response)
                setCollection_name('')
                user.getCollections()
            })
            .catch((error)=>{
                console.log(error)
            })
        }else{
            alert('can not add collection without name')
        }
    }

    // const getCollections = () =>{
    //     axios({url:'http://127.0.0.1:5500/api/get-collection',method:'POST',headers:{"authorization":`bearer ${JSON.parse(user.token)}`}})
    //     .then((response)=>{
    //         setCollections(response.data)
    //     })
    //     .catch((error)=>{
    //         console.log(error)
    //     })
    // }

    // const getRecentImages = () =>{
    //     axios({url:'http://127.0.0.1:5500/api/get-images',method:'GET',headers:{"authorization":`bearer ${JSON.parse(user.token)}`}})
    //     .then((response)=>{
    //         setImages(response.data)
    //     })
    //     .catch((error)=>{
    //         console.log(error)
    //     })
    // }

    const imagePreview = (url) =>{
        setPreviewImage(url)
        setImgPop(true)
    }

    

    useEffect(()=>{
        console.log(user.token)
       let token = localStorage.getItem('auth_token')
        if(user.isLogin || token) {
            user.setIsLogin(true)
            user.getCollections(null)
            user.getRecentImages(null)
        }
    },[])


  return (
    <>
       {imgPop && <ImagePopUp image={previewImage} close={()=>setImgPop(false)}/>}
        <div className="container py-4">
            {/* Collection  */}
            <div className="d-flex flex-column py-4 border" >
                <div className='d-flex flex-column mx-auto mt-1'>
                    <h2 className='text-center'>Your Collections</h2>
                    { user.isLogin && <div role='button' onClick={()=>setAddCollectionPop(true)} className='d-flex m-auto  rounded bg-transperent fw-bold align-items-center text-light '> <FaFolderPlus color='gold' size={20} className='mx-2'/> </div> }   
                </div>
                {addCollectionPop && <div className="mx-auto my-2 d-flex align-items-center">
                <span className='mx-1'><CiCircleRemove onClick={()=>setAddCollectionPop(false)} size={20} role='button'/></span>
                    <input type="text" value={collection_name} onChange={(e)=>setCollection_name(e.target.value)} className='form-control form-control-sm' />
                    <span className='btn btn-primary btn-sm mx-1' onClick={addCollectionHandler}>ADD</span>
                </div>}
                { user.isLogin ? <div className="d-flex px-4  row justify-content-center">
                    
                    {user.collections.length >= 1 ? user.collections.map((element, index)=>{
                        return <div key={index} className='col-md-2 col-4 d-flex flex-column p-2' onClick={()=>navigate(`/collections/${element.collection_name}/${element.collection_id}`)}>
                        <FcFolder size={80} className='m-auto' />
                        <span className='text-center'>{element.collection_name}</span>
                        </div>
                    })
                    : <div className='col-md-3 col-4 m-auto d-flex p-2 w-100'>
                            <div className='m-auto'>
                                <p className='text-center'>{`You don't have any collection yet`}</p>
                            </div>
                    </div>}
                </div> : <div className="d-flex row m-auto">
                    <div className='col-md-3 col-4 m-auto d-flex p-2 w-100'>
                            <div className='m-auto'>
                                <p className='text-center'>No collections please login to see your collection</p>
                            </div>
                    </div>
                    </div> }
            </div>

        {/* Recently added */}

        <div className="container">
            <div className="py-4">
                <h1 className='text-center'>Recently Added</h1>
            </div>
            <div className='row d-flex justify-content-center  border   p-2'>
                    
            {
                 user.isLogin &&  user.images.length >= 1 ? user.images.map((element, index)=>{
                            return  <div key={index} onClick={()=>imagePreview(element.image_url)} className="col-md-3 col-6 p-2 " style={{maxHeight:"250px", maxWidth:"250px"}}>
                            <img style={{height:"100%", width:"100%"}} src={element.image_url} className='img-fluid  w-100 mx-auto mb-2' alt="" />
                            </div>
                    }): <div className="col-md-3 col-6 p-2 " style={{maxHeight:"250px", maxWidth:"250px"}}>
                            <h6 className='text-center'>No images found in this collection</h6>
                    </div>
                   }
                   
                  
            </div>
        </div>
        </div>
    </>
  )
}

export default Dashboard