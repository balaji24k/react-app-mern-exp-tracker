import AuthContext from "./AuthContext";
import { useState, useCallback } from "react";

const AuthProvider = (props) => {
  const [userName, setuserName] = useState(localStorage.getItem("userName"));
  const [token, setToken] = useState(localStorage.getItem("token"));

  const isLoggedIn = !!token;

  const login = (token, userName) => {
    // console.log(token, userName, "in login handler authctx");
    localStorage.setItem("token", token);
    localStorage.setItem("userName", userName);
    setToken(token);
    setuserName(userName);
  };

  const logout = useCallback(() => {
    setToken(null);
    setuserName(null);
    localStorage.clear();
    window.location.reload()
  },[]);

  const ctx = { userName,login,logout,isLoggedIn };
  return (
    <AuthContext.Provider value={ctx}>
        {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
