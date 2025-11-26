import { createContext, useContext, useState } from 'react';
import { AllProduct } from '../MyData';

const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
  const favorites = [
    { id: 7, size: 'M', state: 'available' },
    { id: 11, size: 'S', state: 'unavailable' },
    { id: 13, size: 'S', state: 'available' },
  ];

  const productMap = AllProduct.reduce((acc, product) => {
    acc[product.id] = product;
    return acc;
  }, {});

  const InitialFavorites = favorites
    .map((criterion) => {
      const fullProduct = productMap[criterion.id];

      if (
        !fullProduct ||
        (criterion.size && !fullProduct.size.includes(criterion.size))
      ) {
        return null;
      }

      return {
        id: fullProduct.id,
        image: fullProduct.image,
        pname: fullProduct.pname,
        color: fullProduct.color,
        size: criterion.size,
        price: fullProduct.price,
        state: criterion.state,
        event: fullProduct.event,
        discount: fullProduct.discount,
      };
    })
    .filter((product) => product !== null);

  const [addedFavorites, setAddedFavorites] = useState(InitialFavorites);

  const isAdded = (productPname, color, size) => {
    return addedFavorites.some(
      (item) =>
        item.pname === productPname &&
        item.color === color &&
        item.size === size
    );
  };

  const addToFavorites = (product) => {
    setAddedFavorites((prevItems) => {
      if (isAdded) {
        return prevItems.map((item) => item);
      } else {
        return [...prevItems, product];
      }
    });
  };

  const delFromFavorite = (item) => {
    setAddedFavorites((prevItems) =>
      prevItems.filter((_, index) => index !== item)
    );
  };
  return (
    <FavoriteContext.Provider
      value={{
        addedFavorites,
        setAddedFavorites,
        isAdded,
        addToFavorites,
        delFromFavorite,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorite = () => useContext(FavoriteContext);
