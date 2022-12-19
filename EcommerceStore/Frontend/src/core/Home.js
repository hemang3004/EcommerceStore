import React,{useEffect,useState} from "react";
import { API } from "../backend";
import "../styles.css"
import Base from "./Base";
import Card from "./Card";
import {getProducts} from "./helper/coreapicalls.js"


export default function Home() {
const [products, setProducts] = useState([])
const [error, setError] = useState(false)


const loadAllProducts=()=>{
  getProducts().then(data=>{
    // console.log(data)
    if(data.error){
      setError(data.error)
    }
    else{
      setProducts(data)
    }
  })
};
useEffect(() => {
  loadAllProducts()
})
   
  return (
    <Base title="Home Page">
      <div className="row text-center">
        <h1 className="text-white">All Ts</h1>
        <div className="row">
          {products.map((product,index)=>{
            return(
             <div key={index} className="mb-4 col-4">
              <Card product={product}/>
             </div>
            
            )
          })}
        </div>
      </div>
    </Base>
  )
}
