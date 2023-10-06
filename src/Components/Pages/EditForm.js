import { useContext, useRef } from "react";
import Form from "../Layout/UI/Form";
import ProductContext from "../Context/ProductContext";
import classes from "./EditForm.module.css";
import React from "react";
import ReactDOM from "react-dom";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose}></div>;
};

const EditForm = (props) => {
  const id = document.getElementById("EditModalOverlay");
  const ProductCtx = useContext(ProductContext);

  const moneyRef = useRef("");
  const descRef = useRef("");
  const categoryRef = useRef("");

  const Product = props.editProduct;

  const editProductHandler = (event) => {
    event.preventDefault();

    const ProductItem = {
      id: Product.id,
      money: moneyRef.current.value,
      description: descRef.current.value,
      category: categoryRef.current.value,
    };
    ProductCtx.editProduct(ProductItem);
    props.onClose();
  };

  const Overlay = () => {
    return (
      <div className={classes.modal}>
        <Form onSubmit={editProductHandler}>
          <h2>Edit Product</h2>
          <div>
            <label htmlFor="moneyId">Price</label>
            <input
              id="moneyId"
              type="number"
              ref={moneyRef}
              defaultValue={Product.money}
              required
            ></input>
          </div>
          <div>
            <label htmlFor="descId">Description</label>
            <input
              id="descId"
              type="text"
              ref={descRef}
              defaultValue={Product.description}
              required
            ></input>
          </div>
          <div htmlFor="categoryId">
            <label htmlFor="categoryId">Category</label>
            <select
              id="categoryId"
              ref={categoryRef}
              defaultValue={Product.category}
            >
              <option value="Food">Food</option>
              <option value="Grocery">Grocery</option>
              <option value="Fuel">Fuel</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <button>Edit Product</button>
        </Form>
      </div>
    );
  };

  return (
    <React.Fragment>
      {ReactDOM.createPortal(<Backdrop onClose={props.onClose} />, id)}
      {ReactDOM.createPortal(<Overlay>{props.children}</Overlay>, id)}
    </React.Fragment>
  );
};

export default EditForm;