import { styled } from '@mui/material/styles';
import {
  FormControl,
  FormHelperText,
  Grid,
  Icon,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import { useDeliveryAndPayment } from '../../context/DeliveryAndPaymentContext';

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    color: '#474747',
    p: 0,
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  'td, th': {
    border: 0,
  },
}));

export default function PaymentInfo({ totalSum }) {
  const { selectedPayment } = useDeliveryAndPayment();
  const creditCard = () => (
    <>
      <FormControl variant='outlined' fullWidth required sx={{ my: 1 }}>
        <InputLabel size='small' sx={{ fontSize: 14 }}>
          卡號
        </InputLabel>
        <OutlinedInput
          size='small'
          endAdornment={
            <InputAdornment position='end'>
              <Tooltip title='所有交易均安全且已加密' arrow placement='top-end'>
                <Icon sx={{ fontSize: 14 }}>lock_outline</Icon>
              </Tooltip>
            </InputAdornment>
          }
          label='卡號'
        />
      </FormControl>
      <FormControl variant='outlined' fullWidth required sx={{ my: 1 }}>
        <InputLabel size='small' sx={{ fontSize: 14 }}>
          持卡人姓名
        </InputLabel>
        <OutlinedInput
          size='small'
          endAdornment={
            <InputAdornment position='end'>
              <Tooltip title='姓和名請用一個空格分開' arrow placement='top-end'>
                <Icon sx={{ fontSize: 14 }}>help_outline</Icon>
              </Tooltip>
            </InputAdornment>
          }
          label='持卡人姓名'
        />
      </FormControl>
      <Grid container spacing={1}>
        <Grid size={6}>
          <FormControl variant='outlined' fullWidth required sx={{ my: 1 }}>
            <InputLabel size='small' sx={{ fontSize: 14 }}>
              有效期(MM/YY)
            </InputLabel>
            <OutlinedInput size='small' label='有效期(MM/YY)' />
          </FormControl>
        </Grid>
        <Grid size={6}>
          <FormControl variant='outlined' fullWidth required sx={{ my: 1 }}>
            <InputLabel size='small' sx={{ fontSize: 14 }}>
              安全碼
            </InputLabel>
            <OutlinedInput
              size='small'
              endAdornment={
                <InputAdornment position='end'>
                  <Tooltip
                    title='卡片背面顯示的3位數字'
                    arrow
                    placement='top-end'
                  >
                    <Icon sx={{ fontSize: 14 }}>help_outline</Icon>
                  </Tooltip>
                </InputAdornment>
              }
              label='安全碼'
            />
          </FormControl>
        </Grid>
      </Grid>
    </>
  );
  const cvsCode = () => <></>;

  const PaymentOptions = ({ option }) => {
    let Payment;
    switch (option) {
      case '信用卡':
        Payment = creditCard;
        break;
      case '超商代碼繳費':
        Payment = cvsCode;
        break;
    }
    return <Payment />;
  };

  return (
    <Table aria-label='customized table'>
      <TableHead>
        <TableRow>
          <StyledTableCell>
            <Grid container>
              <Typography component={Grid} size={6}>
                付款資料
              </Typography>
              <Typography component={Grid} size={6} sx={{ textAlign: 'right' }}>
                合計:{totalSum}
              </Typography>
            </Grid>
          </StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <StyledTableRow>
          <StyledTableCell component='th' scope='row'>
            <FormHelperText>
              已選擇的付款方式：
              {selectedPayment}
            </FormHelperText>
            <PaymentOptions option={selectedPayment} />
          </StyledTableCell>
        </StyledTableRow>
      </TableBody>
    </Table>
  );
}
