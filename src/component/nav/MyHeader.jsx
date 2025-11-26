import { Grid, Icon, useMediaQuery, Button, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import MyNav from './MyNav';
import MobileMenu from './MobileMenu';
import Search from '../Search';
import CartContent from '../cart/CartContent';
import Contact from '../Contact';
import { useContact } from '../../context/ContactContext';

const MyHeader = () => {
  const isMobile = useMediaQuery('(max-width:899px)');
  const { handleOpenContact } = useContact();
  return (
    <>
      {isMobile ? (
        <MobileMenu />
      ) : (
        <Grid
          container
          position='fixed'
          sx={{
            color: 'primary.main',
            bgcolor: 'third.main',
            zIndex: 50,
            width: '100vw',
            height: '60px',
            px: 3,
            boxSizing: 'border-box',
            boxShadow:
              '0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
          }}
        >
          <Grid
            size={{ xs: 10, md: 3 }}
            sx={{
              display: { xs: 'none', md: 'inline-flex' },
              alignItems: 'flex-end',
            }}
          >
            <Button
              disableRipple
              sx={{
                textTransform: 'none',
                fontSize: '1.5rem',
                fontWeight: 500,
                fontFamily: 'Roboto',
                mr: 'auto',
                py: 0,
                '&:hover': {
                  fontWeight: 'bold',
                  bgcolor: 'transparent',
                },
              }}
              href='/'
              component='a'
            >
              Y.C
            </Button>
          </Grid>
          <Grid
            size={4}
            sx={{
              display: { xs: 'none', md: 'inline-flex' },
              alignItems: 'flex-end',
              pb: 1,
            }}
          >
            <MyNav />
          </Grid>
          <Grid
            container
            size='grow'
            sx={{
              display: 'inline-flex',
              alignItems: 'flex-end',
              justifyContent: 'flex-end',
              pb: 1,
            }}
          >
            <Search />
            <IconButton
              onClick={handleOpenContact}
              disableRipple
              sx={{
                py: 0,
                px: 0.5,
                color: 'primary.main',
                '&:hover': { color: 'primary.light', cursor: 'pointer' },
              }}
            >
              <Icon>chat_rounded</Icon>
            </IconButton>
            <Contact />
            <IconButton
              component={Link}
              to='/account'
              disableRipple
              sx={{
                py: 0,
                px: 0.5,
                color: 'primary.main',
                '&:hover': { color: 'primary.light' },
              }}
            >
              <Icon sx={{ fontWeight: 'bold' }}>person_rounded</Icon>
            </IconButton>
            <CartContent />
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default MyHeader;
