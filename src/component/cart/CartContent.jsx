import {
  Badge,
  Button,
  Icon,
  IconButton,
  Modal,
  Paper,
  Slide,
} from '@mui/material';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import CartList from './CartList';
import {
  MiniCartContext,
  MiniCartDispatchContext,
} from '../../context/MiniCartContext';
import { useAuthenticated } from '../../context/AuthenticatedContext';
import { useCart } from '../../context/CartContext';

export default function CartContent() {
  const miniCart = useContext(MiniCartContext);
  const dispatch = useContext(MiniCartDispatchContext);
  const { isAuthenticated } = useAuthenticated();
  const { addedProducts } = useCart();
  const totalAmount = addedProducts.reduce((acc, item) => acc + item.amount, 0);
  return (
    <>
      <IconButton
        onClick={() => {
          dispatch({ type: 'toggle' });
        }}
        disableRipple
        sx={{
          py: 0,
          px: 0.5,
          color: 'primary.main',
          '&:hover': { color: 'primary.light', cursor: 'pointer' },
        }}
      >
        <Badge
          badgeContent={totalAmount}
          color='primary'
          sx={{
            '& .MuiBadge-badge': {
              p: 0,
              width: 18,
              height: 18,
              borderRadius: '50%',
              fontSize: 10,
            },
          }}
        >
          <Icon>shopping_bag_rounded</Icon>
        </Badge>
      </IconButton>
      {miniCart ? (
        <Modal
          slotProps={{
            backdrop: {
              sx: { bgcolor: 'transparent' },
            },
          }}
          open={miniCart}
          onClose={() => {
            dispatch({
              type: 'close',
            });
          }}
        >
          <Slide in={miniCart} direction='left' timeout={300}>
            <Paper
              sx={[
                {
                  width: { md: '20%' },
                  minHeight: '120px',
                  maxHeight: '500px',
                  position: 'absolute',
                  overflowY: 'auto',
                  scrollbarWidth: 'thin',
                  top: 65,
                  right: 15,
                  p: 1,
                },
              ]}
            >
              <CartList />
              {addedProducts.length !== 0 && (
                <Button
                  component={Link}
                  to={isAuthenticated ? '/cart' : '/login'}
                  state={{
                    showAlert: true,
                  }}
                  onClick={() => {
                    dispatch({ type: 'close' });
                  }}
                  variant='contained'
                  size='small'
                  fullWidth
                  sx={{ mt: 1 }}
                >
                  訂單結帳
                </Button>
              )}
            </Paper>
          </Slide>
        </Modal>
      ) : null}
    </>
  );
}
