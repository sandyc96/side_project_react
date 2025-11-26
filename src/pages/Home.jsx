import { Grid, Typography } from '@mui/material';
import MainSlider from '../component/MainSlider';
import NewInSlider from '../component/NewInSlider';

const Home = () => {
  return (
    <>
      <Grid container sx={{ width: '100vw' }}>
        <MainSlider />
        <Grid size={12}>
          <Typography variant='h2' sx={{ my: 5, justifySelf: 'center' }}>
            New In
          </Typography>
          <NewInSlider />
        </Grid>
      </Grid>
    </>
  );
};

export default Home;
