import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import Header from "./components/Header/Header";
import { useContext } from "react";
import AuthContext from "./store/AuthContext";
import ExpenseForm from "./components/Expenses/ExpenseForm";
import ShowExpenses from "./components/Expenses/ShowExpenses";

function App() {
  const { isLoggedIn } = useContext(AuthContext);
  console.log(isLoggedIn,"in app js");
  return (
    <div>
      <Header/>
      <Switch>
        <Route exact path="/">
          {!isLoggedIn && <Redirect to="/login" />}
          {isLoggedIn && <>
            <ExpenseForm/>
            <ShowExpenses/>
          </> }
        </Route>
        <Route exact path="/login">
          {!isLoggedIn && <Login/>}
          {isLoggedIn && <Redirect to="/login" />}
        </Route>
        <Route exact path="/signup">
          {!isLoggedIn && <Signup/>}
          {isLoggedIn && <ExpenseForm/>}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
