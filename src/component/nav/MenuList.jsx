import {
  Icon,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Collapse,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Contact from '../Contact';
import { useContact } from '../../context/ContactContext';

export default function MenuList({ handleDrawerClose }) {
  const { handleOpenContact } = useContact();

  const [openNew, setOpenNew] = useState(false);

  const handleClickNew = () => {
    setOpenNew(!openNew);
  };

  const [openAll, setOpenAll] = useState(false);

  const handleClickAll = () => {
    setOpenAll(!openAll);
  };

  const links = ['/login', '/sign_up'];

  return (
    <List
      sx={{
        width: '100%',
        bgcolor: 'background.paper',
        p: 0,
      }}
      component='nav'
    >
      <ListItemButton component={Link} to='/new_in' onClick={handleDrawerClose}>
        <Icon sx={{ pr: 0.5 }}>loyalty_rounded</Icon>
        <ListItemText primary='新品優惠95折' />
      </ListItemButton>
      <ListItemButton onClick={handleClickNew}>
        <ListItemText primary='New' />
        {openNew ? (
          <Icon sx={{ mr: 1.5 }}>remove_rounded</Icon>
        ) : (
          <Icon sx={{ mr: 1.5 }}>add_rounded</Icon>
        )}
      </ListItemButton>
      <Collapse in={openNew} timeout='auto' unmountOnExit>
        <List component='div' disablePadding>
          {['March', 'April', 'May新品']
            .map((text) => (
              <ListItemButton key={text} sx={{ pl: 4 }}>
                <ListItemIcon>
                  <Icon>auto_awesome</Icon>
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            ))
            .reverse()}
        </List>
      </Collapse>

      <ListItemButton onClick={handleClickAll}>
        <ListItemText primary='All' />
        {openAll ? (
          <Icon sx={{ mr: 1.5 }}>remove_rounded</Icon>
        ) : (
          <Icon sx={{ mr: 1.5 }}>add_rounded</Icon>
        )}
      </ListItemButton>
      <Collapse in={openAll} timeout='auto' unmountOnExit>
        <List component='div' disablePadding>
          {['Tops', 'Bottoms', 'Outerwears', 'Dress', 'Accessories'].map(
            (text) => (
              <ListItemButton key={text} sx={{ pl: 4 }}>
                <ListItemIcon>
                  <Icon>auto_awesome</Icon>
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            )
          )}
        </List>
      </Collapse>
      <Typography sx={{ paddingLeft: 2, fontSize: '20px', color: 'gray' }}>
        帳戶
      </Typography>
      {['會員登入', '新用戶註冊'].map((text, index) => (
        <ListItemButton
          key={text}
          component={Link}
          to={links[index]}
          onClick={handleDrawerClose}
        >
          <ListItemText primary={text} />
        </ListItemButton>
      ))}
      <Typography sx={{ paddingLeft: 2, fontSize: '20px', color: 'gray' }}>
        其它
      </Typography>
      <ListItemButton
        onClick={() => {
          handleOpenContact();
          handleDrawerClose();
        }}
      >
        <ListItemText primary='聯絡我們' />
      </ListItemButton>
      <Contact />
    </List>
  );
}
