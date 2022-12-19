import DropIn from 'braintree-web-drop-in-react'
import React from 'react'
import { useEffect,useState } from 'react'
// import { useState } from 'react'
import { Link } from 'react-router-dom'
import { isAuthenticated } from '../auth/helper'
import { EmptyCart, loadCart } from './helper/CartHelper'
import { getmeToken, processPayment } from './helper/PaymentBHelper'
import {createOrder} from './helper/OrderHelper'
const PaymentBraintree=({products,setReload= f=>f,reload=undefined})=> {
const [info, setInfo] = useState({
    loading:false,
    success:false,
    clientToken:null,
    error:"",
    instance:{}
})
const userId=isAuthenticated() && isAuthenticated().user._id
const token=isAuthenticated() && isAuthenticated().token

const getToken=(userId,token)=>{
    getmeToken(userId,token).then(info =>{
        // console.log(info)
        if(info.error){
            setInfo({...info,error:info.error})
        }
        else{
            const clientToken=info.clientToken
            setInfo({clientToken})
        }
    })
}
useEffect(() => {
  getToken(userId,token)
},)

const showDropIn=()=>{
    return (
        <div>
            { info.clientToken !== null && products.length > 0 ?(
                <div>
                <DropIn
                  options={{ authorization: info.clientToken }}
                  onInstance={(instance) => (info.instance = instance)}
                />
                <button className='d-block w-100 btn-success btn ' onClick={ onPurchase }>Buy</button>
              </div>
            ) :(
                <h3 className="warning">Please buy Something First</h3>
            ) }
        </div>
    )
}

const onPurchase = ()=>{
    setInfo({loading:true})
    let nonce
    info.instance.requestPaymentMethod()
    .then(data=>{
        nonce=data.nonce
        const paymentData={
            paymentMethodNonce:nonce,
            amount: getAmount()
        };
        processPayment(userId,token,paymentData)
        .then(response=>{
            setInfo({...info,success:response.success,loading:false})
            const orderData={
                products:products,
                transaction_id:response.transaction_id,
                amount:response.transaction.amount
            }
            createOrder(userId,token,orderData)
            console.log("DONE")
            EmptyCart(()=>{console.log("Hailu")})
            setReload(!reload);
        })
        .catch(error=>{
            setInfo({loading:false,success:false})
            console.log("NOT DONE")

        })
    })
}
const getAmount=()=>{
    let amount =0;
    products.map(p=>{
        amount = amount + p.price;
    })
    return amount;
}

  return (<div>
    <h3 className="text-warning">Your Bill is {getAmount()}$</h3>
{showDropIn()}
  </div>
  )
}

export default PaymentBraintree