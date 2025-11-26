import {
  Button,
  ButtonGroup,
  Grid,
  Icon,
  Typography,
  Divider,
  IconButton,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useFormat } from '../../context/FormatContext';
import { useCart } from '../../context/CartContext';

export default function CartInfo({ activeStep }) {
  const { addedProducts, setAddedProducts, delFromCart } = useCart();
  const { numFormat } = useFormat();

  const handleAmountChange = (itemId, itemColor, itemSize, delta) => {
    setAddedProducts((prevItems) =>
      prevItems.map((item) => {
        if (
          item.id === itemId &&
          item.color === itemColor &&
          item.size === itemSize
        ) {
          const newAmount = item.amount + delta;
          return { ...item, amount: Math.max(0, newAmount) };
        }
        return item;
      })
    );
  };

  return (
    <>
      <Grid size={12}>
        <Typography align='left' bgcolor='lightgray' p={1}>
          購物車
        </Typography>
      </Grid>
      <Grid container size={12} p={1}>
        <Grid size={{ xs: 12, md: 3.5 }} textAlign='left'>
          <Typography
            display={{ xs: 'none', md: 'block' }}
            borderBottom='1px solid lightgray'
            mb={1}
          >
            商品資料
          </Typography>
        </Grid>
        <Grid size={{ xs: 12, md: 2 }} textAlign='left'>
          <Typography
            display={{ xs: 'none', md: 'block' }}
            borderBottom='1px solid lightgray'
            mb={1}
          >
            優惠
          </Typography>
        </Grid>
        <Grid size={{ xs: 12, md: 2 }}>
          <Typography
            display={{ xs: 'none', md: 'block' }}
            borderBottom='1px solid lightgray'
            mb={1}
          >
            單價
          </Typography>
        </Grid>
        <Grid
          size={{ xs: 8, md: 2.5 }}
          textAlign={{ xs: 'left', md: 'center' }}
        >
          <Typography
            display={{ xs: 'none', md: 'block' }}
            borderBottom='1px solid lightgray'
            mb={1}
          >
            數量
          </Typography>
        </Grid>
        <Grid size={{ xs: 4, md: 2 }}>
          <Typography
            display={{ xs: 'none', md: 'block' }}
            textAlign={{ md: 'left' }}
            pl={{ md: 2 }}
            borderBottom='1px solid lightgray'
            mb={1}
          >
            小計
          </Typography>
        </Grid>
      </Grid>
      {addedProducts.map((item, index) => (
        <Grid key={index} container size={12} p={1}>
          <Grid
            container
            direction={'row'}
            size={{ xs: 12, md: 3.5 }}
            textAlign='left'
          >
            <Grid size={{ md: 'auto' }}>
              <Link to={`/new_in/${item.id}`}>
                <img
                  height={100}
                  src={item.image[0]}
                  style={{ display: 'inline-block' }}
                />
              </Link>
            </Grid>
            <Grid size={'grow'} mx={2}>
              <Typography fontSize={14}>{item.pname}</Typography>
              <Typography fontSize={14}>{item.color}</Typography>
              <Typography fontSize={14}>{item.size}</Typography>
            </Grid>
            <Grid
              size={{ xs: 1 }}
              sx={[
                { display: { md: 'none' } },
                activeStep === 1 && { display: { xs: 'none' } },
              ]}
            >
              <IconButton onClick={() => delFromCart(index)} disableRipple>
                <Icon sx={{ fontSize: 14 }}>close</Icon>
              </IconButton>
            </Grid>
          </Grid>
          <Grid size={{ xs: 12, md: 2 }} textAlign='left'>
            <Divider sx={{ display: { md: 'none' } }} />
            <Typography fontSize={14}>{item.event}</Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 2 }}>
            <Typography textAlign={{ xs: 'right', md: 'center' }} fontSize={14}>
              NT${numFormat(item.price)}
            </Typography>
          </Grid>
          <Grid
            size={{ xs: 8, md: 2.5 }}
            textAlign={{ xs: 'left', md: 'center' }}
          >
            <ButtonGroup variant='outlined' size='small'>
              <Button
                onClick={() => {
                  if (item.amount > 1) {
                    handleAmountChange(item.id, item.color, item.size, -1);
                  } else if (item.amount === 1) {
                    delFromCart(index);
                  }
                }}
              >
                <Icon sx={{ fontSize: 14 }}>remove_rounded</Icon>
              </Button>
              <Button
                component={Typography}
                sx={{
                  fontSize: 12,
                  '&:hover': {
                    cursor: 'default',
                    bgcolor: 'transparent',
                  },
                }}
              >
                {item.amount}
              </Button>
              <Button
                onClick={() =>
                  handleAmountChange(item.id, item.color, item.size, 1)
                }
              >
                <Icon sx={{ fontSize: 14 }}>add_rounded</Icon>
              </Button>
            </ButtonGroup>
          </Grid>
          <Grid
            size={({ xs: 4, md: 1.5 }, activeStep === 1 && { xs: 4, md: 2 })}
          >
            <Typography
              sx={{
                textAlign: { xs: 'right', md: 'left' },
                fontSize: 14,
                pl: { md: 1 },
              }}
            >
              NT${numFormat(item.price * item.amount)}
            </Typography>
          </Grid>
          <Grid
            size={{ md: 0.5 }}
            sx={[
              {
                display: { xs: 'none', md: 'block' },
                ml: 'auto',
              },
              activeStep === 1 && { display: { md: 'none' } },
            ]}
          >
            <IconButton onClick={() => delFromCart(index)} disableRipple>
              <Icon sx={{ fontSize: 14 }}>close</Icon>
            </IconButton>
          </Grid>
        </Grid>
      ))}
    </>
  );
}
