import React, { useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { signup } from "../auth/helper";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    success: false,
    error: "",
  });

  const { name, password, email, error, success } = values;
  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    // console.log("Hello")
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password })
      .then((data) => {
        console.log(data);
        if (data.error) {
          console.log(data.error);
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            error: "",
            success: true,
          });
        }
      })
      .catch(error);
  };

  const successMessage = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-success"
            style={{ display: success ? "" : "none" }}
          >
            New Account Was Created Successfully. Please{" "}
            <Link to="/signin">Login Here</Link>
          </div>
        </div>
      </div>
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

  const signUpForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form action="">
            <div className="form-group">
              <label htmlFor="" className="text-light">
                Name
              </label>
              <input
                className="form-control"
                onChange={handleChange("name")}
                value={name}
                type="text"
              />
            </div>
            <div className="form-group">
              <label htmlFor="" className="text-light">
                Email
              </label>
              <input
                className="form-control"
                onChange={handleChange("email")}
                value={email}
                type="text"
              />
            </div>
            <div className="form-group">
              <label htmlFor="" className="text-light">
                Password
              </label>
              <input
                className="form-control"
                onChange={handleChange("password")}
                value={password}
                type="text"
              />
            </div>

            <button
              onClick={onSubmit}
              className="btn btn-success d-block w-100 btn-block my-2"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };

  return (
    <Base title="Sign Up Page">
      {successMessage()}
      {ErrorMessage()}
      {signUpForm()}

      <p className="text-white text-center">{JSON.stringify(values)}</p>
    </Base>
  );
};
export default Signup;
