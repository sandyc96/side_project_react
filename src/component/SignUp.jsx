import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';

export default function SignUp() {
  return (
    <>
      <Grid container>
        <Stack
          spacing={2}
          sx={{
            display: 'flex',
            alignContent: 'center',
            my: 10,
            width: { xs: '75vw', sm: '60vw', md: '30vw' },
            mx: 'auto',
          }}
        >
          <Typography variant='h2' sx={{ textAlign: 'canter' }}>
            註冊會員
          </Typography>
          <TextField
            id='sign_up_email'
            name='sign_up_email'
            label='電子郵件'
            variant='standard'
            required
          />
          <TextField
            id='sign_up_password'
            name='sign_up_password'
            label='密碼'
            variant='standard'
            required
          />
          <FormControlLabel
            control={<Checkbox defaultChecked disableRipple />}
            label={
              <Typography component={'span'} sx={{ fontSize: '14px' }}>
                我願意接收Y.C商店的最新優惠消息及服務推廣相關資訊
              </Typography>
            }
          />
          <FormControlLabel
            required
            control={<Checkbox required disableRipple />}
            label={
              <Typography component={'span'} sx={{ fontSize: '14px' }}>
                我同意網站
                <Typography
                  component={Link}
                  to='/terms'
                  sx={{ color: 'primary.main', fontSize: '14px' }}
                >
                  服務條款
                </Typography>
                及
                <Typography
                  component={Link}
                  to='/privacy'
                  sx={{ color: 'primary.main', fontSize: '14px' }}
                >
                  隱私權政策
                </Typography>
              </Typography>
            }
          />
          <Button variant='contained' type='submit' size='large'>
            下一步
          </Button>
          <Typography variant='h2' sx={{ pt: 10 }}>
            已經有帳號?
          </Typography>
          <Typography sx={{ color: 'gray', fontSize: '12px', py: 1 }}>
            立即登入享有更多優惠
          </Typography>
          <Button variant='outlined' href='/login' size='large'>
            登入
          </Button>
        </Stack>
      </Grid>
    </>
  );
}
