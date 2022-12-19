import React,{useEffect,useState} from "react";
import { API } from "../backend";
import "../styles.css"
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/CartHelper";
import {getProducts} from "./helper/coreapicalls.js"
import PaymentBraintree from "./PaymentBraintree";


const Cart= ()=> {
    const [products, setProducts] = useState([])
    const [reload, setReload] = useState(false)

    useEffect(() => {
        setProducts(loadCart())
      
    },[reload])
    const loadAllProducts=(products)=>{
        return(
            <div>
                <h2 className="text-white">Loading all products</h2>
                {products.map((item,index)=>(
                    <Card
                    key={index}
                    product={item}
                    removeFromCart={true}
                    addToCart={false}
                    setReload={setReload}
                    reload={reload}
                    />
                ))}
            </div>
        )
    }
    const loadCheckout=()=>{
        return(
            <div>
                <h2 className="text-white">Checking out</h2>
            </div>
        )
    }

  return (
    <Base title="Cart">
      <div className="row text-center">
        
        <div className="row">
          <div className="col-6">{products.length>0 ? loadAllProducts(products): (<h3>No products! Please Buy</h3>)}</div>
          <div className="col-6">{loadCheckout()}
          <PaymentBraintree products={products} setReload={setReload} />
          </div>

        </div>
      </div>
    </Base>
  )
}
export default Cart