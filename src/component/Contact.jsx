import { Box, Modal, Typography, Button, TextField } from '@mui/material';
import { useContact } from '../context/ContactContext';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: 300, sm: 400, md: 600 },
  bgcolor: 'background.paper',
  outline: 'none',
  boxShadow: 24,
  display: 'flex',
  alignContent: 'center',
  justifySelf: 'center',
  flexDirection: 'column',
  rowGap: 2,
  p: 4,
};

export default function Contact() {
  const { openContact, handleCloseContact } = useContact();
  return (
    <>
      <Modal open={openContact} onClose={handleCloseContact}>
        <Box sx={style}>
          <Typography variant='h4' my={1} textAlign={'center'}>
            聯絡我們
          </Typography>
          <TextField
            id='name'
            name='uname'
            label='你的姓名'
            variant='outlined'
            size='small'
            required
          />
          <TextField
            id='email'
            name='email'
            label='你的電子信箱'
            variant='outlined'
            size='small'
            required
          />
          <TextField
            id='message'
            name='message'
            label='留下你的訊息'
            variant='outlined'
            rows={5}
            multiline
            required
          />
          <Button
            type='submit'
            variant='contained'
            fullWidth
            sx={{
              my: 1,
            }}
          >
            送出
          </Button>
        </Box>
      </Modal>
    </>
  );
}
