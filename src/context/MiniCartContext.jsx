import { createContext, useReducer } from 'react';

export const MiniCartContext = createContext();

export const MiniCartDispatchContext = createContext();

export function MiniCartProvider({ children }) {
  const [miniCart, miniCartDispatch] = useReducer(miniCartReducer, false);

  return (
    <>
      <MiniCartContext.Provider value={miniCart}>
        <MiniCartDispatchContext.Provider value={miniCartDispatch}>
          {children}
        </MiniCartDispatchContext.Provider>
      </MiniCartContext.Provider>
    </>
  );
}

function miniCartReducer(miniCart, action) {
  switch (action.type) {
    case 'toggle':
      return !miniCart;

    case 'open':
      return true;

    case 'close':
      return false;
  }
}
