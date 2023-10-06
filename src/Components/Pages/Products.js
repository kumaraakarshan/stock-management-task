import React, { useContext, useRef, useEffect, useState } from "react";
import Form from "../Layout/UI/Form";
import ProductItem from "./ProductItem";
import "./Products.css";
import ProductContext from "../Context/ProductContext";
import EditForm from "./EditForm";

const Products = ({ isAdmin }) => {
  const ProductCtx = useContext(ProductContext);
  const [editFormState, setEditFormState] = useState(false);
  const [editProduct, setEditProduct] = useState("");
  console.log('isadmin', isAdmin);
  const moneyRef = useRef("");
  const descRef = useRef("");
  const categoryRef = useRef("");

  const addProductHandler = (event) => {
    event.preventDefault();
    const Product = {
      money: moneyRef.current.value,
      description: descRef.current.value,
      category: categoryRef.current.value,
    };

    ProductCtx.addProduct(Product);
    moneyRef.current.value = "";
    descRef.current.value = "";
    categoryRef.current.value = "Food";
  };

  const editProductHandler = (id, money, description, category) => {
    setEditFormState(true);
    const Product = {
      id: id,
      money: money,
      description: description,
      category: category,
    };
    setEditProduct(Product);
  };

  const onCloseStateHandler = () => {
    setEditFormState(false);
  };

  useEffect(() => {
    ProductCtx.getProduct();
  }, []);

  return (
    <React.Fragment>
      <h2>Products Page...</h2>
      {isAdmin && ( // Conditionally render the "Add Product" section if isAdmin is true
        <Form onSubmit={addProductHandler}>
          <h2>Add Product</h2>
          <div>
            <label htmlFor="moneyId">Price</label>
            <input id="moneyId" type="number" ref={moneyRef} required></input>
          </div>
          <div>
            <label htmlFor="descId">Description</label>
            <input id="descId" type="text" ref={descRef} required></input>
          </div>
          <div htmlFor="categoryId">
            <label htmlFor="categoryId">Category</label>
            <select id="categoryId" ref={categoryRef}>
              <option value="Food">Food</option>
              <option value="Grocery">Grocery</option>
              <option value="Fuel">Fuel</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <button>Add Product</button>
        </Form>
      )}
      <ProductItem editProduct={editProductHandler} isAdmin={isAdmin} />
      {editFormState && (
        <EditForm onClose={onCloseStateHandler} editProduct={editProduct} />
      )}
    </React.Fragment>
  );
};

export default Products;
