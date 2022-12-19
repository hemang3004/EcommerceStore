import React, { useState, useEffect } from "react";
import { AddItemToCart, RemoveItemFromCart } from "./helper/CartHelper";
import ImageHelper from "./helper/ImageHelper";
import { Redirect } from "react-router-dom";



const Card = ({ product,addToCart=true, removeFromCart=false,setReload= f=>f,reload}) => {



  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);
  const cartTitle = product ? product.name : "A photo";
  const cartDescription = product ? product.description : "Simple Description";
  const cartPrice = product ? product.price : "5";

  const AddToCart = () => {
    AddItemToCart(product, () => setRedirect(true));
  };
  const getARedirect = (redirect) => {
    // console.log(redirect)
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };
  const showAddToCart = (addToCart) =>
    addToCart && (
      <button
        onClick={AddToCart }
        //
        className="btn btn-outline-success rounded-4 d-block w-100 my-2 btn-block"
      >
        {/* btn btn-block btn-outline-success mt-2 mb-2 */}
        Add to Cart
      </button>
    );
  const showRemoveFromCart = (removeFromCart) =>
    removeFromCart && (
      <button
        onClick={() => {
          RemoveItemFromCart(product._id);
          setReload(!reload);
        }}
        className="btn btn-block btn-outline-danger d-block w-100 my-2"
      >
        Remove from cart
      </button>
    );
  return (
    <div className="card text-white bg-dark border border-info ">
      <div className="card-header lead">
        <strong>{cartTitle}</strong>
      </div>
      <div className="card-body">
        {getARedirect(redirect)}
        <div className="rounded border border-success p-2">
          <ImageHelper product={product} />
        </div>
        <p className="lead bg-success font-weight-normal my-2 rounded-3 text-wrap">
          <strong>{cartDescription}</strong>
        </p>
        <p className="btn btn-success rounded  btn-sm px-4 mt-3 ">
          $ {cartPrice}
        </p>
        <div className="row">
          <div className="col-12">{showAddToCart(addToCart)}</div>
          <div className="col-12">{showRemoveFromCart(removeFromCart)}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
