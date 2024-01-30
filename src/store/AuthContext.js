import React from "react";

const AuthContext = React.createContext({
  userName: "",
  login: () => {},
  logout: () => {},
  isLoggedIn: false,
});

export default AuthContext;