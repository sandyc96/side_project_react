import { styled } from '@mui/material/styles';
import {
  FormControl,
  FormHelperText,
  Grid,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useDeliveryAndPayment } from '../../context/DeliveryAndPaymentContext';

const StyledTableRow = styled(TableRow)(() => ({
  'td, th': {
    border: 0,
  },
}));

export default function DeliveryAndPayment() {
  const {
    DeliveryOptions,
    selectedDelivery,
    handleDeliveryOption,
    PaymentOptions,
    selectedPayment,
    handlePaymentOption,
  } = useDeliveryAndPayment();
  return (
    <Grid size={{ xs: 12, md: 6 }} display={'inline-flex'}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>選擇送貨及付款方式</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <StyledTableRow>
              <TableCell component='th' scope='row'>
                <FormControl fullWidth>
                  <FormHelperText>送貨方式</FormHelperText>
                  <Select
                    labelId='delivery-select-label'
                    id='delivery-select'
                    value={selectedDelivery}
                    label='delivery'
                    size='small'
                    onChange={handleDeliveryOption}
                    sx={{
                      '& .MuiSelect-select': { fontSize: 14 },
                    }}
                  >
                    {DeliveryOptions.map((option) => (
                      <MenuItem
                        key={option.title}
                        value={option.title}
                        sx={{ fontSize: 14 }}
                      >
                        {option.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl fullWidth sx={{ marginTop: 1 }}>
                  <FormHelperText>付款方式</FormHelperText>
                  <Select
                    labelId='payment-select-label'
                    id='payment-select'
                    value={selectedPayment}
                    label='payment'
                    size='small'
                    onChange={handlePaymentOption}
                    sx={{
                      '& .MuiSelect-select': { fontSize: 14 },
                    }}
                  >
                    {PaymentOptions.map((option) => (
                      <MenuItem
                        key={option}
                        value={option}
                        sx={{ fontSize: 14 }}
                      >
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </TableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}
