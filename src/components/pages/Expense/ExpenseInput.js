import React, { useRef } from "react";
import { Button, Form } from "react-bootstrap";

const ExpenseInput = (props) => {
  const amountInputRef = useRef();
  const descInputRef = useRef();
  const cateInputRef = useRef();

  if (props.persistData) {
    amountInputRef.current.value = props.persistData.amount;
    descInputRef.current.value = props.persistData.desc;
    cateInputRef.current.value = props.persistData.category;
  }

  const sumbitHandler = (e) => {
    e.preventDefault();
    const amount = amountInputRef.current.value;
    const desc = descInputRef.current.value;
    const category = cateInputRef.current.value;

    let data = {
      amount: amount,
      desc: desc,
      category: category,
      id: Math.random().toString(),
    };

    props.InputData(data);

    if (!props.isItemUpdate) {
      fetch(
        `https://expense-tracker-6affc-default-rtdb.firebaseio.com/expense.json`,
        {
          method: "POST",
          body: JSON.stringify(data),
        }
      );
    }
  };

  const onUpdateButton = (e) => {
    const amount = amountInputRef.current.value;
    const desc = descInputRef.current.value;
    const category = cateInputRef.current.value;

    console.log(amount, desc, category);

    let data = {
      amount: amount,
      desc: desc,
      category: category,
      id: Math.random().toString(),
    };

    props.updatedData(data);
  };

  return (
    <div>
      <Form
        onSubmit={sumbitHandler}
        className="form-control"
        // style={{ width: "60%", margin: "auto" }}
      >
        <h1 style={{ display: "flex", justifyContent: "center" }}>
          Expense Form
        </h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Amount:</Form.Label>
          <Form.Control type="number" ref={amountInputRef} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Description:</Form.Label>
          <Form.Control type="text" ref={descInputRef} />
        </Form.Group>
        <Form.Label>Choose Category:</Form.Label>
        <Form.Select aria-label="Default select example" ref={cateInputRef}>
          <option value="Food">Food</option>
          <option value="Petrol">Petrol</option>
          <option value="Salary">Salary</option>
        </Form.Select>
        <Button className="form-control" variant="primary" type="submit">
          Submit
        </Button>
        {props.isItemUpdate && (
          <Button
            className="form-control"
            variant="primary"
            onClick={onUpdateButton}
          >
            Update
          </Button>
        )}
      </Form>
    </div>
  );
};

export default ExpenseInput;
