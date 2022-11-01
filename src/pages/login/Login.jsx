import React, { useContext, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "..//..//firebase";
import { AuthContext } from '../../context/AuthContext';


export const Login = () => {

  const [formData, updateFormData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate()
  const {dispatch} = useContext(AuthContext)

  isLoading && console.log();
  const handleChange = (e) => {
    updateFormData({
      ...formData,

      // Trimming any whitespace
      [e.target.type]: e.target.value.trim()
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    const {email,password} = formData;

    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);
        dispatch({type:"LOGIN", payload:user});
        user && navigate("/")
        // ...
      })
      .catch((error) => {
        setError(error)
        // ..
      });
      setIsLoading(false);
  };





  return (
    <form className="login">
      <h3>Sign In</h3>
      {error && <p className='failed'>Incorrect password. Please try again, or click on forgot password to reset your password</p>}

      <div className="mb-3">
        <label>Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            className="custom-control-input"
            id="customCheck1"

          />
          <label className="custom-control-label" htmlFor="customCheck1">
            Remember me
          </label>
        </div>
      </div>

      <div className="d-grid">
        <button onClick={handleSubmit} type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
      <p className="forgot-password text-right">
        Forgot <Link to={'/forgot-password'}>password?</Link>
      </p>
    </form>
  )

};