import {
  Box,
  Button,
  Divider,
  Grid,
  Icon,
  ImageList,
  ImageListItem,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

export default function CartList() {
  const { addedProducts, delFromCart } = useCart();

  return (
    <>
      {addedProducts.length === 0 ? (
        <Box
          sx={{
            minHeight: { xs: '100%', md: '120px' },
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography fontSize={12}>你的購物車是空的</Typography>
        </Box>
      ) : (
        addedProducts.map((product, index) => (
          <Grid key={`${product.id}-${product.color}-${product.size}`}>
            <Grid container size={12}>
              <Grid size={{ xs: 4, md: 3 }}>
                <Link to={`/new_in/${product.id}`}>
                  <ImageList
                    sx={{
                      width: '90%',
                      mt: 'auto',
                    }}
                    cols={1}
                  >
                    <ImageListItem>
                      <img
                        src={product.image[0]}
                        style={{ display: 'inline-block' }}
                      />
                    </ImageListItem>
                  </ImageList>
                </Link>
              </Grid>
              <Grid size={'grow'} color={'#4f4f4f'} textAlign={'start'}>
                <Typography fontSize={12}>{product.pname}</Typography>
                <Typography fontSize={12} fontWeight='bold'>
                  {product.color},{product.size}
                </Typography>
              </Grid>
            </Grid>
            <Grid container color={'#4f4f4f'}>
              <Grid size={{ xs: 4, md: 3 }}></Grid>
              <Grid size={'auto'}>
                <Typography fontSize={12} noWrap>
                  {product.amount}x NT${product.price}
                </Typography>
              </Grid>
              <Grid size={{ xs: '0.5', md: 'grow' }}>
                <Button
                  disableRipple
                  onClick={() => {
                    delFromCart(index);
                  }}
                  sx={{
                    '&:hover': { bgcolor: 'transparent' },
                    display: { md: 'flex' },
                    justifySelf: { md: 'flex-end' },
                    p: { md: 0 },
                  }}
                >
                  <Icon sx={{ fontSize: 14 }}>delete</Icon>
                </Button>
              </Grid>
            </Grid>
            {index < addedProducts.length - 1 && <Divider sx={{ my: 1 }} />}
          </Grid>
        ))
      )}
    </>
  );
}
