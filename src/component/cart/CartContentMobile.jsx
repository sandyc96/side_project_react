import { Badge, Box, Button, Drawer, Icon, IconButton } from '@mui/material';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import CartList from './CartList';
import {
  MiniCartContext,
  MiniCartDispatchContext,
} from '../../context/MiniCartContext';
import { useAuthenticated } from '../../context/AuthenticatedContext';
import { useCart } from '../../context/CartContext';

export default function CartContentMobile() {
  const miniCart = useContext(MiniCartContext);
  const dispatch = useContext(MiniCartDispatchContext);
  const { isAuthenticated } = useAuthenticated();
  const { addedProducts } = useCart();
  const totalAmount = addedProducts.reduce((acc, item) => acc + item.amount, 0);

  const DrawerList = (
    <Box
      sx={{
        width: 250,
        height: '100%',
        bgcolor: '#fff',
        p: 1,
      }}
      role='presentation'
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
          sx={{ mt: 1, display: 'flex', justifySelf: 'flex-end' }}
        >
          訂單結帳
        </Button>
      )}
    </Box>
  );

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
      <Drawer
        open={miniCart}
        anchor='left'
        onClose={() => {
          dispatch({ type: 'toggle' });
        }}
        slotProps={{
          backdrop: { sx: { bgcolor: 'transparent' } },
          paper: {
            sx: { mt: { md: '4rem' }, height: { xs: '100%', md: 'auto' } },
          },
        }}
      >
        {DrawerList}
      </Drawer>
    </>
  );
}
