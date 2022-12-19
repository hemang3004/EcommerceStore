import React from "react";
import { isAuthenticated } from "../auth/helper/index";
import Base from "../core/Base"
import { Link } from "react-router-dom";


const AdminDashBoard=()=> {
    const{
        user:{name,email,role},
    }=isAuthenticated()

    const adminLeftSide=()=>{
        return(
            <div className="card">
                <h4 className="card-header bg-dark text-white">Admin Navigation</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        {/* to=/admin/xyz goes to route and appropriate componet is loaded etle ke to="" vado route male to routes.js file ma je matchinng route hoi eno compo call thai*/}
                        <Link to="/admin/create/category" className="nav-link text-success">Create Categories</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/admin/categories" className="nav-link text-success">Manage Categories</Link>
                    </li>
                    
                    <li className="list-group-item">
                        <Link to="/admin/create/product" className="nav-link text-success">Create Products</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/admin/products" className="nav-link text-success">Manage Products</Link>
                    </li>
                    <li className="list-group-item">
                        <Link to="/admin/orders" className="nav-link text-success">Orders</Link>
                    </li>
                </ul>
            </div>
        )
    }
    const adminRightSide=()=>{
        return(
            <div className="card mb-4">
                <h4 className="card-header">Admin Information</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <span className="badge bg-success mr-2">Name : </span> <span> {name}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="badge bg-success mr-2">Email : </span><span> {email}</span>
                    </li>
                </ul>
            </div>
        )
    }
    
  return (
    <Base title="Welcome Admin!" className="container bg-success p-4">
        <div className="row">
            <div className="col-3">{adminLeftSide()}</div>
            <div className="col-9">{adminRightSide()}</div>
        </div>
    
    
    </Base>
  )
}

export default AdminDashBoard