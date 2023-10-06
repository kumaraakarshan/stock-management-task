import {useContext } from "react";
import ProductContext from "../Context/ProductContext";

const ProductItem = (props) => {
  const ProductCtx = useContext(ProductContext);

  return (
    <ul>
      {ProductCtx.Products.map((ProductItem) => (
        <li key={ProductItem.id}>
          {ProductItem.money} {ProductItem.description} {ProductItem.category}
          {props.isAdmin && (
            <>
              <button
                onClick={props.editProduct.bind(
                  null,
                  ProductItem.id,
                  ProductItem.money,
                  ProductItem.description,
                  ProductItem.category
                )}
              >
                Edit
              </button>
              <button onClick={ProductCtx.deleteProduct.bind(null, ProductItem.id)}>
                Delete
              </button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default ProductItem;