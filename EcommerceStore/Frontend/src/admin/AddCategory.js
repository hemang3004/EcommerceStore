import React, { useState } from "react";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { createCategory } from "./helper/adminapicall";

const AddCategory = () => {
    // const categoryName=""
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const { user, token } = isAuthenticated();

  const goBack = () => (
    <div className="mt-5">
      <Link className="btn btn-sm btn-info mb-3" to="/admin/dashboard">
        Admin Dashboard
      </Link>
    </div>
  );
  const CategoryForm = () => (
    <form action="">
      <div className="form-group">
        <p className="lead">Enter Category</p>
        <input
          type="text"
          className="form-control my-3"
          onChange={handleChange}
          value={name}
          autoFocus
          required
          placeholder="For Ex. Summer"
        />
        <button className="btn btn-outline-info" onClick={onSubmit}>
          Create Category
        </button>
      </div>
    </form>
  );
  const onSubmit = (event) => {
    event.preventDefault();
    setSuccess(false);
    setError("");
    // check here imp!!!
    createCategory(user._id, token, { name })
      .then((data) => {
        if (data.error) {
          setError(true);
        } else {
          setError("");
          setSuccess(true);
          setName("")
        }
      })
      .catch((err) => {
          setError(true)
          console.log(err)
        });
  };
  const successMessage=()=>{
      if(success){
          return(
              <h4 className="text-success alert my-2 bg-warning ">Category {name} created </h4>
              )
      }
  }
  const errorMessage=()=>{
    if(error){
        return(
            <h4 className="alert my-2 bg-dark text-danger">Error Creating Category </h4>
            )
    }
}

  const handleChange = (event) => {
    setName(event.target.value);
  };

  return (
    <Base title="Create A Category Here" className="container bg-info p-4">
      <div className="row bg-white rounded">
        <div className="col-md-8 offset-md-2">
        {errorMessage()}
        {CategoryForm()}
        {successMessage()}  
        {goBack()}
        </div>
      </div>
    </Base>
  );
};

export default AddCategory;
