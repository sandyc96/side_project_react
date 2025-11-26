import { styled } from '@mui/material/styles';
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormHelperText,
  Grid,
  Icon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import RegionSelect from './RegionSelect';
import { useDeliveryAndPayment } from '../../context/DeliveryAndPaymentContext';

const StyledTableRow = styled(TableRow)(() => ({
  'td, th': {
    border: 0,
  },
}));

export default function DeliveryInfo({ customer01 }) {
  const [sameAsCustomer, setSameAsCustomer] = useState(false);

  const [recipientInfo, setRecipientInfo] = useState({
    cname: '',
    email: '',
    phone: '',
  });

  const handleReceiveInfo = (event) => {
    setSameAsCustomer(event.target.checked);
    if (event.target.checked) {
      setRecipientInfo(customer01);
    } else {
      setRecipientInfo({
        cname: document.getElementById('#rname').value,
        phone: document.getElementById('#rphone').value,
      });
    }
  };

  const { selectedDelivery } = useDeliveryAndPayment();

  const cvs = () => (
    <>
      <Grid container direction='row' my={1}>
        <Icon>storefront</Icon>
        <Typography fontSize={14} alignSelf={'flex-end'}>
          選擇7-11門市
        </Typography>
      </Grid>
      <Button variant='contained' fullWidth>
        搜尋門市
      </Button>
    </>
  );
  const home = () => (
    <>
      <FormHelperText>地址</FormHelperText>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container rowSpacing={2} columnSpacing={1}>
          <Grid container size={12}>
            <RegionSelect />
            <TextField label='地址' size='small' fullWidth required />
          </Grid>
        </Grid>
      </Box>
    </>
  );
  const store = () => (
    <>
      <FormHelperText sx={{ mt: 2 }}>配送時間約2~3天</FormHelperText>
    </>
  );
  const DeliveryOptions = ({ option }) => {
    let Delivery;
    switch (option) {
      case '7-11取貨不付款':
        Delivery = cvs;
        break;
      case '宅配':
        Delivery = home;
        break;
      case '門市自取':
        Delivery = store;
        break;
    }
    return <Delivery />;
  };

  return (
    <Table aria-label='customized table'>
      <TableHead>
        <TableRow>
          <TableCell>送貨資料</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <StyledTableRow>
          <TableCell component='th' scope='row'>
            <FormHelperText>
              已選擇的送貨方式：{selectedDelivery}
            </FormHelperText>
            <FormControlLabel
              control={
                <Checkbox
                  checked={sameAsCustomer}
                  onChange={handleReceiveInfo}
                  size='small'
                />
              }
              label='收件人資料與顧客資料相同'
              sx={{
                '& .MuiFormControlLabel-label': {
                  fontSize: 12,
                  color: 'gray',
                },
              }}
            />
            <TextField
              id='rname'
              label='收件人名稱'
              value={recipientInfo.cname}
              onChange={(event) => {
                setRecipientInfo({
                  ...recipientInfo,
                  cname: event.target.value,
                });
                if (event.target.value != customer01.cname) {
                  setSameAsCustomer(false);
                }
              }}
              variant='outlined'
              fullWidth
              required
              size='small'
              sx={{
                my: 1,
                '& .MuiInputLabel-root': {
                  fontSize: 14,
                },
              }}
            />
            <FormHelperText>
              請填入收件人真實姓名，以確保順利收件
            </FormHelperText>
            <TextField
              id='rphone'
              label='收件人電話號碼'
              value={recipientInfo.phone}
              onChange={(event) => {
                setRecipientInfo({
                  ...recipientInfo,
                  phone: event.target.value,
                });
                if (event.target.value != customer01.phone) {
                  setSameAsCustomer(false);
                }
              }}
              variant='outlined'
              fullWidth
              required
              size='small'
              sx={{
                my: 1,
                '& .MuiInputLabel-root': {
                  fontSize: 14,
                },
              }}
            />
            <Divider sx={{ my: 1 }} />
            <DeliveryOptions option={selectedDelivery} />
          </TableCell>
        </StyledTableRow>
      </TableBody>
    </Table>
  );
}
