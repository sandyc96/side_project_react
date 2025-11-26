import { AuthenticatedProvider } from './context/AuthenticatedContext';
import { CartProvider } from './context/CartContext';
import { ContactProvider } from './context/ContactContext';
import { DeliveryAndPaymentProvider } from './context/DeliveryAndPaymentContext';
import { FavoriteProvider } from './context/FavoriteContext';
import { FormatProvider } from './context/FormatContext';
import { MiniCartProvider } from './context/MiniCartContext';
import { OrderProvider } from './context/OrderContext';

const GlobalProvider = ({ children }) => {
  return (
    <AuthenticatedProvider>
      <FavoriteProvider>
        <FormatProvider>
          <OrderProvider>
            <CartProvider>
              <DeliveryAndPaymentProvider>
                <ContactProvider>
                  <MiniCartProvider>{children}</MiniCartProvider>
                </ContactProvider>
              </DeliveryAndPaymentProvider>
            </CartProvider>
          </OrderProvider>
        </FormatProvider>
      </FavoriteProvider>
    </AuthenticatedProvider>
  );
};
export default GlobalProvider;
