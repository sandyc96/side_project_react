import { createContext, useContext, useState } from 'react';

const AuthenticatedContext = createContext();

export const AuthenticatedProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <AuthenticatedContext.Provider
      value={{ isAuthenticated, setIsAuthenticated }}
    >
      {children}
    </AuthenticatedContext.Provider>
  );
};
export const useAuthenticated = () => useContext(AuthenticatedContext);
