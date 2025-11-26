import { Grid, IconButton, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { SiFacebook, SiLine, SiInstagram } from 'react-icons/si';

export default function Footer() {
  const link = ['/about', '/faqs', '/store'];
  return (
    <>
      <Grid
        container
        spacing={{ xs: 3, md: 0 }}
        display={{ xs: 'grid', md: 'inline-flex' }}
        sx={{
          width: '100%',
          height: { xs: '250px', md: '200px' },
          color: 'white',
          bgcolor: 'secondary.main',
          borderTopLeftRadius: 100,
          borderTopRightRadius: 100,
          py: 5,
        }}
      >
        <Grid
          container
          spacing={{ xs: 8, md: 2 }}
          size={{ xs: 12, md: 6 }}
          justifyContent={{ xs: 'center', md: 'flex-end' }}
          my={{ xs: 1, md: 'auto' }}
        >
          {['ABOUT', 'FAQS', 'STORE'].map((text, index) => (
            <Grid key={text} size={{ md: 2 }}>
              <Typography
                component={Link}
                to={link[index]}
                underline='hover'
                sx={{ color: 'third.main', fontFamily: 'roboto' }}
              >
                {text}
              </Typography>
            </Grid>
          ))}
        </Grid>
        <Grid
          container
          size={{ xs: 12, md: 6 }}
          sx={{ alignContent: 'flex-end', mx: 'auto' }}
          my={{ md: 'auto' }}
          display={{ xs: 'grid', md: 'flex' }}
          gridTemplateRows='auto auto'
          justifyContent={{ xs: 'center', md: 'flex-start' }}
        >
          <Grid size={{ xs: 12, md: 'auto' }} gridRow={2} my={'auto'}>
            <Typography
              display={'flex'}
              justifyContent={{ xs: 'space-evenly', md: 'flex-start' }}
              pt={{ xs: 3, md: 0 }}
            >
              <IconButton
                component={Link}
                to={'https://www.facebook.com'}
                disableRipple
                sx={{ pl: { md: 2 }, color: 'third.main', fontSize: '24px' }}
              >
                <SiFacebook />
              </IconButton>
              <IconButton
                component={Link}
                to='https://www.line.me/tw/'
                disableRipple
                sx={{ pl: { md: 2 }, color: 'third.main', fontSize: '24px' }}
              >
                <SiLine />
              </IconButton>
              <IconButton
                component={Link}
                to='https://www.instagram.com'
                disableRipple
                sx={{ pl: { md: 2 }, color: 'third.main', fontSize: '24px' }}
              >
                <SiInstagram />
              </IconButton>
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 'auto' }} gridRow={1} my={'auto'}>
            <Typography ml={{ md: 2 }} sx={{ textWrap: 'nowrap' }}>
              客服信箱：
              <Typography
                component={Link}
                to='mailto:service@yc.example.com'
                underline='hover'
                sx={{ color: 'third.main' }}
              >
                service@yc.example.com
              </Typography>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
