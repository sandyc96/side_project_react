import { createContext, useContext, useState } from 'react';
import { AllProduct } from '../MyData';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [addedProducts, setAddedProducts] = useState([]);

  const [products] = useState(AllProduct);

  const addToCart = (product) => {
    setAddedProducts((prevItems) => {
      const existingItem = prevItems.find(
        (item) =>
          item.pname === product.pname &&
          item.color === product.color &&
          item.size === product.size
      );
      if (existingItem) {
        return prevItems.map((item) =>
          item.pname === existingItem.pname &&
          item.color === existingItem.color &&
          item.size === existingItem.size
            ? { ...item, amount: item.amount + product.amount }
            : item
        );
      } else {
        return [...prevItems, { ...product, amount: product.amount }];
      }
    });
  };

  const addToCartFromFavorite = (product) => {
    setAddedProducts((prevItems) => {
      const existingItem = prevItems.find(
        (item) =>
          item.pname === product.pname &&
          item.color === product.color &&
          item.size === product.size
      );
      if (existingItem) {
        return prevItems.map((item) =>
          item.pname === existingItem.pname &&
          item.color === existingItem.color &&
          item.size === existingItem.size
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, amount: 1 }];
      }
    });
  };

  const delFromCart = (product) => {
    setAddedProducts((prevProducts) =>
      prevProducts.filter((_, index) => index !== product)
    );
  };

  const emptyCart = () => {
    setAddedProducts([]);
  };

  const [clickedInfo, setClickedInfo] = useState([
    { pname: null, color: '', size: '' },
  ]);
  const handleClickedInfo = (item) => {
    setClickedInfo(item);
  };
  return (
    <CartContext.Provider
      value={{
        addedProducts,
        setAddedProducts,
        products,
        addToCart,
        addToCartFromFavorite,
        delFromCart,
        emptyCart,
        clickedInfo,
        handleClickedInfo,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
