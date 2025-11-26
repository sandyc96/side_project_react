import { createContext, useContext, useState } from 'react';
import { OrderHistory } from '../MyData';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orderHistory, setOrderHistory] = useState(OrderHistory);

  const transmitOrder = (order) => {
    setOrderHistory((prevOrders) => [...prevOrders, order]);
  };

  return (
    <OrderContext.Provider value={{ orderHistory, transmitOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => useContext(OrderContext);
