import { useContext, useRef } from "react";
import { Button, Form, Row, Col, Container } from "react-bootstrap";
import classes from "./ExpenseForm.module.css";
import ExpenseContext from "../../store/ExpenseContext";

const ExpenseForm = () => {
  const expenseRef = useRef();
  const categoryRef = useRef();
  const priceRef = useRef();

  const { addExpense } = useContext(ExpenseContext)

  const submitHandler = (event) => {
    try {
      event.preventDefault();
      const expense = expenseRef.current.value;
      const category = categoryRef.current.value;
      const price = +priceRef.current.value;
      const newExpense = { expense, category, price };
      addExpense(newExpense)
      clearFields();
    } catch (error) {
      console.log(error);
    }
  };

  const clearFields = () => {
    expenseRef.current.value = "";
    categoryRef.current.value = "";
    priceRef.current.value = "";
  }

  return (
    <>
    <Container fluid className="bg-warning p-3">
        <Row>
          <Form onSubmit={submitHandler}>
            <Row>
              <Col className="col">
                <Form.Group>
                  <Form.Label className={classes.label}>Expense:</Form.Label>
                  <Form.Control 
                    placeholder="Expense Name" 
                    type="text" 
                    ref={expenseRef}>
                  </Form.Control>
                </Form.Group>
              </Col>

              <Col className="col">
                <Form.Group>
                  <Form.Label className={classes.label}>Price:</Form.Label>
                  <Form.Control placeholder="Price" type="number" ref={priceRef}></Form.Control>
                </Form.Group>
              </Col>

              <Col className="col">
                <Form.Group>
                  <Form.Label className={classes.label}>Category:</Form.Label>
                  <Form.Select type="select" ref={categoryRef} required>
                    <option value="" hidden>Choose Category</option>
                    <option value="Food">Food</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Fuel">Fuel</option>
                    <option value="House Expense">House Expense</option>
                    <option value="Education Fee">Education Fee</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col className="col-2">
                <Button
                  className={classes.button}
                  variant="success"
                  type="submit"
                >
                  Add Expense
                </Button>{' '}

    
              </Col>
            </Row>
          </Form>
      </Row>
    </Container>

  </>
  );
};

export default ExpenseForm;
