import React, { useRef } from 'react';
import classes from "./Auth.module.css";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import useHttp from '../../hooks/useHttp';

const Signup = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const history = useHistory();

  const sendRequest = useHttp();

  const submitHandler = async(e) => {
    try {
      e.preventDefault();
      const name = nameRef.current.value;
      const email = emailRef.current.value;
      const password = passwordRef.current.value;

      const enteredData = {name,email,password};

      const data = sendRequest({
        method: "POST",
        body: enteredData,
        endPoint: "user/signup"
      })
      
      console.log(data,"success data in login");
      history.replace("/login");
    } catch (error) {
      alert(error);
      // console.log(error,"error in signup catch");
    }
  }

  return (
    <div className={classes.container}>
      <form onSubmit={submitHandler}>
        <label>Name:</label>
        <input ref={nameRef} placeholder='Name' />
        <label>Email:</label>
        <input type='email' ref={emailRef} placeholder='Email' />
        <label>Password:</label>
        <input ref={passwordRef} placeholder='Password' />
        <button>Signup</button>
      </form>
    </div>
  )
}

export default Signup