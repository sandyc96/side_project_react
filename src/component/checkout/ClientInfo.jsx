import { styled } from '@mui/material/styles';
import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';

const StyledTableRow = styled(TableRow)(() => ({
  'td, th': {
    border: 0,
  },
}));

export default function ClientInfo({ customer01 }) {
  return (
    <Grid size={{ xs: 12, md: 6 }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>顧客資料</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <StyledTableRow>
              <TableCell component='th' scope='row'>
                <TextField
                  id='cname'
                  label='顧客姓名'
                  defaultValue={customer01.cname}
                  variant='outlined'
                  fullWidth
                  size='small'
                  sx={{
                    my: 1.5,
                    '& .MuiInputLabel-root': {
                      fontSize: 14,
                    },
                  }}
                />
                <TextField
                  id='email'
                  label='電子信箱'
                  defaultValue={customer01.email}
                  variant='outlined'
                  fullWidth
                  size='small'
                  sx={{
                    my: 1.5,
                    '& .MuiInputLabel-root': {
                      fontSize: 14,
                    },
                  }}
                />
                <TextField
                  id='cphone'
                  label='電話號碼'
                  defaultValue={customer01.phone}
                  variant='outlined'
                  fullWidth
                  size='small'
                  sx={{
                    my: 1.5,
                    '& .MuiInputLabel-root': {
                      fontSize: 14,
                    },
                  }}
                />
              </TableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}
