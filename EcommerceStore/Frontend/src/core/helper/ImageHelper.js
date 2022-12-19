import React from 'react'
import {API} from "../../backend.js"

const ImageHelper=({product})=>{
    // console.log(product)
   const imageURL=product ? `${API}/product/photo/${product._id}` : `https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940`
              
  return (
    <img
              src={imageURL}
              alt="photo"
              style={{ maxHeight: "100%", maxWidth: "100%", height:"24rem" ,width:"24rem"}}
              className="mb-3 rounded"
            />
  )
}

export default ImageHelper