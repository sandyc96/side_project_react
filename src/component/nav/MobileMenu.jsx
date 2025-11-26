import { styled } from '@mui/material/styles';
import { Drawer, Toolbar, Button, Icon, IconButton } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import MenuList from './MenuList';
import Search from '../Search';
import CartContentMobile from '../cart/CartContentMobile';
import Contact from '../Contact';

const drawerWidth = '100%';

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        width: `calc(100% - ${drawerWidth}vw)`,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: drawerWidth,
      },
    },
  ],
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));

export default function MobileMenu() {
  const [openMenu, setOpenMenu] = useState(false);
  const handleOpenMenu = () => {
    setOpenMenu(true);
  };
  const handleCloseMenu = () => {
    setOpenMenu(false);
  };

  return (
    <>
      <AppBar open={openMenu} sx={{ bgcolor: 'third.main' }}>
        <Toolbar
          disableGutters={true}
          sx={{
            bgcolor: 'third.main',
            height: '60px',
            boxSizing: 'border-box',
          }}
        >
          <Button
            disableRipple
            sx={{
              textTransform: 'none',
              fontSize: '1.5rem',
              fontWeight: 500,
              mr: 'auto',
              px: 2,
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
          <Search />
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
          <CartContentMobile />
          <IconButton
            onClick={handleOpenMenu}
            sx={
              ([openMenu && { display: 'none' }],
              {
                pl: 1,
                pr: 2,
                color: 'primary.main',
                alignSelf: 'center',
                '&:hover': { bgcolor: 'transparent' },
              })
            }
          >
            <Icon>menu</Icon>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
          },
        }}
        variant='persistent'
        anchor='right'
        open={openMenu}
      >
        <DrawerHeader sx={{ bgcolor: 'third.main' }}>
          <Button
            disableRipple
            sx={{
              textTransform: 'none',
              fontSize: '1.5rem',
              fontWeight: 500,
              mr: 'auto',
              px: 2,
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
          <IconButton
            disableRipple
            onClick={handleCloseMenu}
            sx={{
              px: 2,
              '&:hover': {
                bgcolor: 'transparent',
              },
            }}
          >
            <Icon sx={{ color: 'primary.main' }}>highlight_off</Icon>
          </IconButton>
        </DrawerHeader>
        <MenuList handleDrawerClose={handleCloseMenu} />
      </Drawer>
    </>
  );
}
