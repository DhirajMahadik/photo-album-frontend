import React, { useEffect } from 'react'

const ImagePopUp = ({close, image}) => {

//   useEffect(()=>{
//     document.body.style.overflow ='hidden'
//     return()=>{
//         document.body.style.overflow =''
//     }
// })

  return (
    <div className='vh-100 w-100 d-flex flex-column position-absolute z-1' style={{backgroundColor:'#00000099'}}>
        <div className='d-flex container justify-content-end my-4 px-4'>
            <span className='text-light fs-4' role='button' onClick={()=>close()}>
                close X
            </span>
        </div>
        {/* <div className='m-auto'> */}
        <img src={image} className='img-fluid m-auto  w-50' alt="" />
        {/* </div> */}
    </div>
  )
}

export default ImagePopUp