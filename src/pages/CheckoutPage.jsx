import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Divider,
  Grid,
  Icon,
  Paper,
  Step,
  StepLabel,
  Stepper,
  TableContainer,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import CartInfo from '../component/checkout/CartInfo';
import DeliveryAndPayment from '../component/checkout/DeliveryAndPayment';
import OrderDetail from '../component/checkout/OrderDetail';
import ClientInfo from '../component/checkout/ClientInfo';
import DeliveryInfo from '../component/checkout/DeliveryInfo';
import PaymentInfo from '../component/checkout/PaymentInfo';
import { useCart } from '../context/CartContext';
import { useFormat } from '../context/FormatContext';
import { useOrder } from '../context/OrderContext';
import { useDeliveryAndPayment } from '../context/DeliveryAndPaymentContext';

export default function CheckoutPage() {
  const { addedProducts, emptyCart } = useCart();
  const { numFormat } = useFormat();
  const { transmitOrder } = useOrder();
  const { deliveryFee } = useDeliveryAndPayment();

  const subtotal = addedProducts.reduce(
    (acc, item) => acc + item.price * item.amount,
    0
  );
  const subDiscount = addedProducts.reduce(
    (acc, item) =>
      Math.ceil(acc + (item.price * item.amount || 0) * item.discount),
    0
  );
  const totalAmount = addedProducts.reduce((acc, item) => acc + item.amount, 0);
  const totalSum = subtotal - subDiscount + deliveryFee;

  const steps = ['購物車', '填寫資料', '訂單確認'];

  const [activeStep, setActiveStep] = useState(0);

  const currentDate = new Date();
  const today = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();
  const date = `${year}${month}${today}`;
  const defaultNo = Number(date.padEnd(13, 0));
  const [nextNo, setNextNo] = useState(defaultNo);

  const ButtonText = ({ text }) => {
    switch (text) {
      case 0:
        return '前往結帳';
      case 1:
        return '提交訂單';
      case 2:
        return '繼續購物';
    }
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setNextNo((prevNo) => prevNo + 1);
    const order = addedProducts;
    if (activeStep == 1) {
      transmitOrder({
        ...order,
        date: date,
        No: nextNo,
        sum: totalSum,
        state: ['處理中', null],
      });
      emptyCart();
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const customer01 = {
    cname: '王小美',
    email: 'shopaholic20@example.com',
    phone: '0928282828',
  };

  return (
    <>
      <Grid
        container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          color: 'gray',
          mt: 5,
          width: '100%',
        }}
      >
        <Box sx={{ width: { xs: '100%', md: '80%' } }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => {
              const stepProps = {};
              const labelProps = {};
              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </Box>
      </Grid>

      <Grid
        container
        rowSpacing={3}
        size={12}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          color: 'gray',
          width: '80%',
          mx: 'auto',
          my: 2,
        }}
      >
        {activeStep == 0 && (
          <>
            {addedProducts.length == 0 ? (
              <Grid
                container
                size={12}
                sx={{
                  color: '#4f4f4f',
                  mt: 5,
                  mb: 10,
                  justifyContent: 'center',
                }}
              >
                <Grid size={12}>
                  <Icon
                    sx={{
                      display: 'flex',
                      justifySelf: 'center',
                      fontSize: 120,
                      color: 'lightgray',
                    }}
                  >
                    shopping_cart
                  </Icon>
                </Grid>
                <Grid size={12}>
                  <Typography
                    sx={{ color: 'dark', fontSize: 12, fontWeight: 'bold' }}
                  >
                    你的購物車是空的
                  </Typography>
                  <Typography sx={{ fontSize: 12 }}>
                    快去逛逛把商品加入購物車吧
                  </Typography>
                </Grid>
              </Grid>
            ) : (
              <Box
                sx={{
                  flexGrow: { xs: 0.8, md: 0.7 },
                }}
              >
                <Grid container component={Paper}>
                  <CartInfo />
                </Grid>
                <Grid container spacing={5} my={3}>
                  <DeliveryAndPayment />
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TableContainer component={Paper}>
                      <OrderDetail
                        subtotal={numFormat(subtotal)}
                        subDiscount={numFormat(subDiscount)}
                        totalSum={numFormat(totalSum)}
                      />
                    </TableContainer>
                  </Grid>
                </Grid>
              </Box>
            )}
          </>
        )}
        {activeStep == 1 && (
          <Box
            sx={{
              flexGrow: { xs: 0.8, md: 0.7 },
            }}
          >
            <Accordion
              sx={{
                boxShadow: 'none',
                border: '1px solid #F0F0F0',
              }}
              disableGutters
            >
              <AccordionSummary
                expandIcon={<Icon>expand_more</Icon>}
                aria-controls='panel1-content'
                id='panel1-header'
                sx={{
                  '& .MuiAccordionSummary-content': {
                    justifyContent: 'center',
                    mx: 'auto',
                  },
                }}
              >
                <Grid container direction={'column'}>
                  <Typography fontWeight={'bold'} fontSize={14}>
                    合計:NT$ {numFormat(totalSum)}
                  </Typography>
                  <Typography fontSize={14} alignItems={'center'}>
                    購物車({totalAmount}件)
                  </Typography>
                </Grid>
              </AccordionSummary>
              <AccordionDetails sx={{ p: 0 }}>
                <CartInfo activeStep={activeStep} />
                <Divider />
                <Box
                  sx={{
                    display: { xs: 'grid', md: 'flex' },
                    justifyContent: { md: 'flex-end' },
                    mt: 2,
                  }}
                >
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TableContainer>
                      <OrderDetail
                        activeStep={activeStep}
                        subtotal={numFormat(subtotal)}
                        subDiscount={numFormat(subDiscount)}
                        totalSum={numFormat(totalSum)}
                      />
                    </TableContainer>
                  </Grid>
                </Box>
              </AccordionDetails>
            </Accordion>
            <Grid container spacing={5} my={3}>
              <ClientInfo customer01={customer01} />
              <Grid size={{ xs: 12, md: 6 }}>
                <TableContainer component={Paper}>
                  <DeliveryInfo customer01={customer01} />
                </TableContainer>
                <TableContainer component={Paper} sx={{ mt: 3 }}>
                  <PaymentInfo totalSum={numFormat(totalSum)} />
                </TableContainer>
              </Grid>
            </Grid>
          </Box>
        )}

        {activeStep == steps.length - 1 ? (
          <>
            <Grid
              container
              size={12}
              sx={{ color: '#4f4f4f', mt: 5, mb: 10, justifyContent: 'center' }}
            >
              <Grid size={12}>
                <Icon
                  sx={{ display: 'flex', justifySelf: 'center', fontSize: 100 }}
                >
                  assignment_turned_in
                </Icon>
              </Grid>
              <Grid size={12}>
                <Typography sx={{ mt: 2, mb: 1, textAlign: 'center' }}>
                  已收到你的訂單
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              sx={{
                display: 'flex',
                flexDirection: 'row',
                mb: 3,
              }}
            >
              <Grid size={12}>
                <Box sx={{ flex: '1 1 auto' }} />
                <Button href='/new_in' variant='contained' sx={{ mb: 3 }}>
                  繼續購物
                </Button>
                <Box sx={{ flex: '1 1 auto' }} />
              </Grid>
            </Grid>
          </>
        ) : (
          <>
            <Box
              sx={{
                display: { xs: 'grid', md: 'flex' },
                flexDirection: { xs: 'column', md: 'row' },
                width: { xs: '90%', md: '80%' },
                justifySelf: 'center',
                mb: 3,
              }}
            >
              {activeStep == 1 && (
                <Button
                  color='inherit'
                  onClick={handleBack}
                  sx={{
                    p: 0,
                    mt: { xs: 2, md: 0 },
                    gridRow: 2,
                    fontSize: 12,
                    fontWeight: 'normal',
                    color: '#5b5b5b',
                  }}
                >
                  <Icon>chevron_left</Icon>返回購物車
                </Button>
              )}
              <Box sx={{ flex: '1 1 auto' }} />

              <Button
                onClick={() => {
                  addedProducts != 0 && handleNext();
                }}
                component={Link}
                to={addedProducts.length == 0 && '/new_in'}
                sx={{ gridRow: 1 }}
                variant='contained'
              >
                <ButtonText text={addedProducts == 0 ? 2 : activeStep} />
              </Button>
              {activeStep == 0 ? <Box sx={{ flex: '1 1 auto' }} /> : null}
            </Box>
          </>
        )}
      </Grid>
    </>
  );
}
