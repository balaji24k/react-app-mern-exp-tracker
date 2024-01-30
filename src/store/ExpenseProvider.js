import React, { useContext, useEffect, useState } from 'react'
import ExpenseContext from './ExpenseContext';
import useHttp from '../hooks/useHttp';
import AuthContext from './AuthContext';

const ExpenseProvider = (props) => {
  const [expenses, setExpenses] = useState([]);
  const [isRemoving,setIsRemoving] = useState(false);
  const { userName, isLoggedIn } = useContext(AuthContext);

  const sendRequest = useHttp();

  useEffect(() => {
    const fetchData = async() => {
      try {
        if (!isLoggedIn) {
          return;
        }
        const data = await sendRequest({endPoint: "expense"});
        console.log(data,"in use effect");
        setExpenses(data);
      } catch (error) {
        console.log(error,"in useeffect");
      }
    }
    fetchData();
  },[userName,sendRequest, isLoggedIn])

  const addExpense = async(newExpense) => {
    try {
      const data = await sendRequest({
        method: "POST",
        body: newExpense,
        endPoint: "expense"
      })
      console.log(data,"in add expense");
      const updatedExpense = {...newExpense, _id: data.insertedId}
      setExpenses([...expenses,updatedExpense]);
    } catch (error) {
      console.log();
    }
  }

  const removeExpense = async(expenseId) => {
    try {
      setIsRemoving(expenseId);
      await sendRequest({
        method: "DELETE",
        endPoint: `expense/${expenseId}`
      })
      setIsRemoving(false)
      const updatedExpenses = expenses.filter(exp => exp._id !== expenseId);
      setExpenses(updatedExpenses);
    } catch (error) {
      alert(error);
    }
  }

  const ctx = {expenses, isRemoving, addExpense, removeExpense};
  return (
    <ExpenseContext.Provider value={ctx}>
      {props.children}
    </ExpenseContext.Provider>
  );
}

export default ExpenseProvider