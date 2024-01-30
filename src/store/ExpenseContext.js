import React from "react"

const ExpenseContext = React.createContext({
  expenses: [],
  isRemoving: false,
  addExpense: () => {},
  removeExpense: () => {}
});

export default ExpenseContext;