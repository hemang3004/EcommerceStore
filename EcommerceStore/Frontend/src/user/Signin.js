import React,{useState} from "react";
import Base from "../core/Base"
import {Link,Redirect} from "react-router-dom";
import { signin,authenticate,isAuthenticated } from "../auth/helper";

const Signin =()=>{

    const [values, setValues] = useState({
        name: "",
        email: "user1@user.com",
        password: "1234567890",
        loading: false,
        error:false,
        
        didRedirect: "",
      });
      const{name,email,password,didRedirect,error,loading}=values
      const {user}=isAuthenticated()

      const loadingMessage = () => {
        return (
          loading && (
              <div className="alert alert-info">
                  <h2>Loading...</h2>
              </div>
          )
        );
      };
      const ErrorMessage = () => {
        return (
          <div className="row">
            <div className="col-md-6 offset-sm-3 text-left">
              <div
                className="alert alert-danger"
                style={{ display: error ? "" : "none" }}
              >
                {error}
              </div>
            </div>
          </div>
        );
      };
      const handleChange = (name) => (event) => {
        setValues({ ...values, error: false, [name]: event.target.value });
      };

      const performRedirect=()=>{
          if(didRedirect){
              if(user&&user.role===1){
                  return <Redirect to="/admin/dashboard" />
              }
              else{
                return (<div>
                  <p>Redirect to User</p>
                  <Redirect to="/user/dashboard" />
                </div>
                )
              }
          }
          // if(isAuthenticated()){
          //     return <Redirect to="/" />
          // }
      }

      const onSubmit=event=>{
        event.preventDefault();
        setValues({...values,error:false,loading:true})
        signin({email,password})
        .then(data=>{
            if(data.error){
                setValues({...values,error:data.error,loading:true,success:false})
            }
            else{
                authenticate(data,()=>{
                    setValues({...values,didRedirect:true,success:true})
                })
            }
        })
        .catch(err=>console.log(err))
      }
    const signInForm=()=>{
        return(
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form action="">
                        <div className="form-group">
                            <label htmlFor="" className="text-light">Email</label>
                            <input className="form-control" onChange={handleChange("email")} value={email} type="text" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="" className="text-light">Password</label>
                            <input className="form-control" onChange={handleChange("password")}value={password}  type="text" />
                        </div>
                        
                        <button onClick={onSubmit} className="btn btn-success d-block w-100 my-2 btn-block">Submit</button>
                    </form>

                </div>
            </div>
        )
    }


    return(
        <Base title="Sign Up Page">
            {/* <h1>Sign Up Works</h1> */}
            {loadingMessage()}
            {ErrorMessage()}
            {signInForm()}
            {performRedirect()}
            <p className="text-white text-center">{JSON.stringify(values)}</p>
        </Base>
    )
     }
export default Signin; 