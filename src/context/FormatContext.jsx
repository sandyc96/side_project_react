import { createContext, useContext } from 'react';

const FormatContext = createContext();

export const FormatProvider = ({ children }) => {
  const dateFormat = (date) => {
    if (date === null || date === undefined) {
      return '';
    }
    return date.slice(0, 4) + '/' + date.slice(4, 6) + '/' + date.slice(6, 8);
  };
  const numFormat = (number) => {
    return new Intl.NumberFormat('zh-TW').format(number);
  };
  return (
    <FormatContext.Provider value={{ dateFormat, numFormat }}>
      {children}
    </FormatContext.Provider>
  );
};
export const useFormat = () => useContext(FormatContext);
