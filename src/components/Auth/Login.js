import React, { useContext, useRef } from 'react';
import classes from "./Auth.module.css";
import AuthContext from '../../store/AuthContext';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import useHttp from '../../hooks/useHttp';

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const history = useHistory();

  const sendRequest = useHttp();

  const { login } = useContext(AuthContext);

  const submitHandler = async(e) => {
    try {
      e.preventDefault();
      const email = emailRef.current.value;
      const password = passwordRef.current.value;

      const enteredData = {email,password};

      const data = await sendRequest({
        method: "POST",
        body: enteredData,
        endPoint: "user/login"
      })
      console.log(data,"success data in login");
      login(data.token, data.name);
      history.replace("/");
    } catch (error) {
      console.log(error,"catch login");
      alert(error);
    }
  }

  return (
    <div className={classes.container}>
      <form onSubmit={submitHandler}>
        <label>Email:</label>
        <input type='email' ref={emailRef} placeholder='Email' />
        <label>Password:</label>
        <input ref={passwordRef} placeholder='Password' />
        <button>Login</button>
      </form>
    </div>
  )
}

export default Login