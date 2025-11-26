import { styled, alpha } from '@mui/material/styles';
import { Button, Menu, MenuItem, Icon, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'left',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'left',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 3,
    color: 'rgb(55, 65, 81)',
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px,  rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    backgroundColor: '#FFFAF3',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      backgroundColor: '#FFFAF3',

      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

const MyButton = styled(Button)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  padding: theme.spacing(1, 0.5),
  border: 'none',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '0%',
    height: '1.5px',
    backgroundColor: theme.palette.primary.main,
    transition: 'width 0.3s ease-out',
  },
  '&:hover': {
    backgroundColor: 'transparent',
    '&::after': {
      width: '100%',
    },
  },
  '&:hover span': {
    color: theme.palette.primary.dark,
  },
}));

export default function MyNav() {
  const [anchorAll, setAnchorAll] = useState(null);
  const openAll = Boolean(anchorAll);
  const handleClickAll = (event) => {
    setAnchorAll(event.currentTarget);
  };
  const handleCloseAll = () => {
    setAnchorAll(null);
  };

  const [anchorNew, setAnchorNew] = useState(null);
  const openNew = Boolean(anchorNew);
  const handleClickNew = (event) => {
    setAnchorNew(event.currentTarget);
  };
  const handleCloseNew = () => {
    setAnchorNew(null);
  };

  const [anchorEvent, setAnchorEvent] = useState(null);
  const openEvent = Boolean(anchorEvent);
  const handleClickEvent = (event) => {
    setAnchorEvent(event.currentTarget);
  };
  const handleCloseEvent = () => {
    setAnchorEvent(null);
  };

  return (
    <>
      <Stack direction='row' display={'flex'} alignItems={'flex-end'}>
        <MyButton
          id='all-button'
          aria-controls={openAll ? 'all-menu' : undefined}
          aria-haspopup='true'
          aria-expanded={openAll ? 'true' : undefined}
          variant='text'
          disableElevation
          onClick={handleClickAll}
          endIcon={<Icon>keyboard_arrow_down_rounded</Icon>}
          sx={{ borderRadius: 0, py: 0 }}
        >
          All
        </MyButton>
        <StyledMenu
          id='all-menu'
          slotProps={{
            list: {
              'aria-labelledby': 'all-button',
            },
          }}
          anchorEl={anchorAll}
          open={openAll}
          onClose={handleCloseAll}
        >
          {['Tops', 'Bottoms', 'Outerwears', 'Dress', 'Accessories'].map(
            (text) => (
              <MenuItem key={text} onClick={handleCloseAll} disableRipple>
                {text}
              </MenuItem>
            )
          )}
        </StyledMenu>

        <MyButton
          id='new-button'
          aria-controls={openNew ? 'new-menu' : undefined}
          aria-haspopup='true'
          aria-expanded={openNew ? 'true' : undefined}
          variant='text'
          disableElevation
          onClick={handleClickNew}
          endIcon={<Icon>keyboard_arrow_down_rounded</Icon>}
          sx={{ borderRadius: 0, py: 0 }}
        >
          New
        </MyButton>
        <StyledMenu
          id='new-menu'
          slotProps={{
            list: {
              'aria-labelledby': 'new-button',
            },
          }}
          anchorEl={anchorNew}
          open={openNew}
          onClose={handleCloseNew}
        >
          {['March', 'April', 'May新品']
            .map((text) => (
              <MenuItem key={text} onClick={handleCloseNew} disableRipple>
                {text}
              </MenuItem>
            ))
            .reverse()}
        </StyledMenu>

        <MyButton
          id='event-button'
          aria-controls={openEvent ? 'event-menu' : undefined}
          aria-haspopup='true'
          aria-expanded={openEvent ? 'true' : undefined}
          variant='text'
          disableElevation
          onClick={handleClickEvent}
          endIcon={<Icon>keyboard_arrow_down_rounded</Icon>}
          sx={{ borderRadius: 0, py: 0 }}
        >
          Event
        </MyButton>
        <StyledMenu
          id='event-menu'
          slotProps={{
            list: {
              'aria-labelledby': 'event-button',
            },
          }}
          anchorEl={anchorEvent}
          open={openEvent}
          onClose={handleCloseEvent}
        >
          {['新品優惠95折'].map((text) => (
            <MenuItem key={text} onClick={handleCloseEvent} disableRipple>
              <Typography component={Link} to='/new_in' color='primary.main'>
                {text}
              </Typography>
            </MenuItem>
          ))}
        </StyledMenu>
      </Stack>
    </>
  );
}
