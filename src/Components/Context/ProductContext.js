import React, { useState } from "react";

const ProductContext = React.createContext({
  Products: null,
  addProduct: () => {},
  getProduct: () => {},
  deleteProduct: () => {},
  editProduct: () => {},
});
export const ProductContextProvider = (props) => {
  const [Products, setProducts] = useState([]);

  const addProductHandler = (Products) => {
    const addProductItem = async (Products) => {
      try {
        const response = await fetch(
          "https://expense-tracker-b4081-default-rtdb.firebaseio.com/Products.json",
          {
            method: "POST",
            body: JSON.stringify({
              money: Products.money,
              description: Products.description,
              category: Products.category,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();

        getProductHandler();
      } catch (error) {
        alert(error.message);
      }
    };
    addProductItem(Products);
  };

  const getProductHandler = () => {
    const getProductItem = async () => {
      try {
        const response = await fetch(
          "https://expense-tracker-b4081-default-rtdb.firebaseio.com/Products.json",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        let itemsArray = [];
        if (!!data) {
          itemsArray = Object.keys(data).map((Product) => {
            return {
              id: Product,
              money: data[Product].money,
              description: data[Product].description,
              category: data[Product].category,
            };
          });
        }
        setProducts(itemsArray);
      } catch (error) {
        console.log(error.message);
      }
    };

    getProductItem();
  };

  const deleteProductHandler = (id) => {
    const deleteProductItem = async (id) => {
      try {
        const response = await fetch(
          `https://expense-tracker-b4081-default-rtdb.firebaseio.com/Products/${id}.json`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();

        getProductHandler();
      } catch (error) {
        alert(error.message);
      }
    };
    deleteProductItem(id);
  };

  const editProductHandler = (ProductItem) => {
    const editProductItem = async (ProductItem) => {
      try {
        const response = await fetch(
          `https://expense-tracker-b4081-default-rtdb.firebaseio.com/Products/${ProductItem.id}.json`,
          {
            method: "PUT",
            body: JSON.stringify({
              money: ProductItem.money,
              description: ProductItem.description,
              category: ProductItem.category,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        getProductHandler();
      } catch (error) {
        alert(error.message);
      }
    };
    editProductItem(ProductItem);
  };

  const contextValue = {
    Products: Products,
    addProduct: addProductHandler,
    getProduct: getProductHandler,
    deleteProduct: deleteProductHandler,
    editProduct: editProductHandler,
  };

  return (
    <ProductContext.Provider value={contextValue}>
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductContext;