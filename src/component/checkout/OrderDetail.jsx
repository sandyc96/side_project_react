import { styled } from '@mui/material/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { useDeliveryAndPayment } from '../../context/DeliveryAndPaymentContext';

const StyledTableRow = styled(TableRow)(() => ({
  'td, th': {
    border: 0,
  },
}));

export default function OrderDetail({
  activeStep,
  subtotal,
  subDiscount,
  totalSum,
}) {
  const { deliveryFee } = useDeliveryAndPayment();

  function createData(title, price) {
    return { title, price };
  }

  const rows = [
    createData('小計:', `NT$${subtotal}`),
    createData('折扣:', `-NT$${subDiscount}`),
    createData('運費:', `NT$${deliveryFee}`),
  ];

  return (
    <Table>
      <TableHead sx={[activeStep === 1 && { display: 'none' }]}>
        <TableRow>
          <TableCell colSpan={2}>訂單資訊</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <StyledTableRow key={row.title}>
            <TableCell component='th' scope='row'>
              {row.title}
            </TableCell>
            <TableCell align='right'>{row.price}</TableCell>
          </StyledTableRow>
        ))}
        <StyledTableRow
          sx={{ borderTop: '1px solid lightgray', height: '62px' }}
        >
          <TableCell component='th' scope='row'>
            合計:
          </TableCell>
          <TableCell align='right'>NT${totalSum}</TableCell>
        </StyledTableRow>
      </TableBody>
    </Table>
  );
}
