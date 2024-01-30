import classes from "./ShowExpenses.module.css";
import { Button, Spinner } from "react-bootstrap";
import { useContext } from "react";
import ExpenseContext from "../../store/ExpenseContext";

const ShowExpenses = () => {
  const {expenses, removeExpense, isRemoving} = useContext(ExpenseContext);

  return (
    <div className={classes.box}>
      <h2 className={classes.text}>Expenses</h2>
      {expenses.length === 0 && <h6 className={classes.text} >No Expenses!</h6>}
      {expenses.length > 0 &&
        expenses.map(expense => 
          <div key={expense._id} className={classes.expense}>
            <h5>{expense.expense}</h5>
            <h5>{expense.category}</h5>
            <h5>{expense.price}</h5>
            <h5>{expense.date}</h5>
            <Button >
              Edit
            </Button>
            <Button 
              onClick={removeExpense.bind(null, expense._id)} 
              variant="danger"
            >
              {(isRemoving === expense._id) ?   
                <span>
                  Removing...
                  <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/>
                </span>
                : 
                'Remove Expense'
              }
            </Button>
          </div>
        )}
    </div>
  );
};

export default ShowExpenses;