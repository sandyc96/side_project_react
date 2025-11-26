import {
  Box,
  ClickAwayListener,
  FormControlLabel,
  Grid,
  Icon,
  IconButton,
  Paper,
  Slide,
  TextField,
} from '@mui/material';
import { useState } from 'react';

export default function Search() {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  return (
    <>
      <ClickAwayListener onClickAway={handleClickAway}>
        <Grid
          container
          size={'auto'}
          sx={{
            alignItems: { md: 'flex-end' },
          }}
          direction={{ xs: 'column', md: 'row' }}
        >
          <Box
            sx={{ overflow: 'hidden', display: { xs: 'none', md: 'initial' } }}
          >
            <Slide in={open} direction='left' timeout={500}>
              <TextField
                size='small'
                variant='standard'
                placeholder='輸入商品名稱或編號'
                sx={{
                  '& .MuiInput-input::placeholder': {
                    fontSize: 13,
                  },
                }}
              />
            </Slide>
          </Box>
          <Grid container>
            <Box
              sx={{
                overflow: 'hidden',
                display: { xs: 'initial', md: 'none' },
                flexGrow: 1,
              }}
            >
              <Slide in={open} direction='down' timeout={300}>
                <Grid
                  container
                  component={Paper}
                  spacing={1}
                  sx={{
                    position: 'absolute',
                    top: 60,
                    left: 0,
                    zIndex: -10,
                    width: '100vw',
                    px: 2,
                    alignItems: 'center',
                    borderRadius: 0,
                  }}
                >
                  <Grid size={'grow'}>
                    <TextField
                      size='small'
                      variant='standard'
                      fullWidth
                      placeholder='輸入商品名稱或編號'
                      sx={{
                        '& .MuiInput-input::placeholder': {
                          fontSize: 13,
                        },
                        height: 40,
                        pt: 1.5,
                      }}
                    />
                  </Grid>
                  <Grid size={'auto'}>
                    <IconButton disableRipple sx={{ p: 0 }}>
                      <Icon sx={{ fontWeight: 'bold' }}>search_rounded</Icon>
                    </IconButton>
                  </Grid>
                </Grid>
              </Slide>
            </Box>
            <FormControlLabel
              sx={{ m: 0 }}
              control={
                <IconButton
                  onClick={() => {
                    !open && handleClick();
                  }}
                  disableRipple
                  sx={{
                    py: 0,
                    px: 0.5,
                    color: 'primary.main',
                    '&:hover': {
                      color: 'primary.light',
                      cursor: 'pointer',
                    },
                    ml: { xs: 'auto', md: 0 },
                  }}
                >
                  <Icon sx={{ fontWeight: 'bold' }}>search_rounded</Icon>
                </IconButton>
              }
            />
          </Grid>
        </Grid>
      </ClickAwayListener>
    </>
  );
}
