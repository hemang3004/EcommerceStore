import React ,{Fragment}from "react";
import { Link,withRouter,useHistory } from "react-router-dom";
import { isAuthenticated, signout } from "../auth/helper";




const currentTab=(history,path)=>{
    if(history.location.pathname===path){
        console.log(path);
        return{color:"#ffffff"};
    }
    else{
        return{color:"#d1d1d1"};
    }
};

const Menu=({history})=> {
    
  return (
    <div>
        <ul className="nav nav-tabs ">
            <li className="nav-link">
                <Link /*styles={currentTab(history,"/")}*/ className="nav-item" to="/">
                    Home
                </Link>
            </li>
            <li className="nav-link">
                <Link  className="nav-item" to="/cart">
                    Cart
                </Link>
            </li>
            {isAuthenticated() &&isAuthenticated().user.role==0 && (
                <li className="nav-link">
                <Link className="nav-item" to="/user/dashboard">
                    Dashboard
                </Link>
            </li>
            )}
            {isAuthenticated() &&isAuthenticated().user.role==1 && ( <li className="nav-link">
                <Link className="nav-item" to="/admin/dashboard">
                    A.Dashboard
                </Link>
            </li>)}
            
           
            {!isAuthenticated() && (
                <Fragment>
                <li className="nav-link">
                    <Link className="nav-item" to="/signin">
                        Sign In
                    </Link>
                </li>
                <li className="nav-link">
                    <Link className="nav-item" to="/signup">
                        Sign Up
                    </Link>
                </li>
                </Fragment>
            )}
            
            {isAuthenticated() && (
                <li className="nav-item">
                    <span className="nav-link text-warning" onClick={()=>{
                        signout(()=>{
                            console.log(history)
                            history.push("/")
                        })
                    }}>
                        Sign Out
                    </span>
                </li>
            )}
        </ul>
    </div>
  )
}

export default Menu