import { createContext, useContext, useState } from 'react';

const DeliveryAndPaymentContext = createContext();

export const DeliveryAndPaymentProvider = ({ children }) => {
  const DeliveryOptions = [
    { title: '7-11取貨不付款', fee: 65 },
    { title: '宅配', fee: 100 },
    { title: '門市自取', fee: 0 },
  ];

  const [selectedDelivery, setSelectedDelivery] = useState(
    DeliveryOptions[0].title
  );

  const [deliveryFee, setDeliveryFee] = useState(DeliveryOptions[0].fee);

  const handleDeliveryOption = (event) => {
    const newDelivery = event.target.value;

    const changeDelivery = DeliveryOptions.find(
      (option) => option.title === newDelivery
    );

    if (changeDelivery) {
      setSelectedDelivery(newDelivery);
      setDeliveryFee(changeDelivery.fee);
    }
  };

  const PaymentOptions = ['信用卡', '超商代碼繳費'];

  const [selectedPayment, setSelectedPayment] = useState(PaymentOptions[0]);

  const handlePaymentOption = (event) => {
    const newPayment = event.target.value;

    const changePayment = PaymentOptions.find(
      (option) => option === newPayment
    );

    if (changePayment) {
      setSelectedPayment(newPayment);
    }
  };

  return (
    <DeliveryAndPaymentContext.Provider
      value={{
        DeliveryOptions,
        selectedDelivery,
        handleDeliveryOption,
        deliveryFee,
        PaymentOptions,
        selectedPayment,
        handlePaymentOption,
      }}
    >
      {children}
    </DeliveryAndPaymentContext.Provider>
  );
};
export const useDeliveryAndPayment = () =>
  useContext(DeliveryAndPaymentContext);
