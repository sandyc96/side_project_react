import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useFormat } from '../context/FormatContext';

export default function NewInSlider() {
  const { products, handleClickedInfo } = useCart();
  const { numFormat } = useFormat();
  const newItemIds = [3, 5, 8, 9, 11, 13];
  return (
    <>
      <Box
        sx={{
          width: { xs: '90%', sm: '85%', lg: '80%' },
          mx: 'auto',
          mb: 5,
        }}
      >
        <Swiper
          navigation={true}
          slidesPerView={1}
          spaceBetween={15}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            300: {
              slidesPerView: 1,
              spaceBetween: 35,
            },
            550: {
              slidesPerView: 2,
              spaceBetween: 35,
            },
            1350: {
              slidesPerView: 3,
              spaceBetween: 35,
            },
            1800: {
              slidesPerView: 4,
              spaceBetween: 35,
            },
            2200: {
              slidesPerView: 5,
              spaceBetween: 35,
            },
          }}
          modules={[Pagination, Navigation]}
          style={{
            '--swiper-theme-color': '#8D591C',
            '--swiper-navigation-size': '30px',
            '--swiper-navigation-outline': 'none',
            '--swiper-navigation-sides-offset': '0px',
            paddingLeft: 30,
            paddingRight: 30,
          }}
        >
          {products
            .filter((item) => newItemIds.includes(item.id))
            .map((item) => (
              <SwiperSlide key={item.id}>
                <Card
                  sx={{
                    mb: 5,
                    justifySelf: 'center',
                  }}
                >
                  <Link
                    to={`/new_in/${item.id}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <CardActionArea
                      onClick={() => {
                        handleClickedInfo(item);
                      }}
                    >
                      <CardMedia component='img' image={item.image[0]} />
                      <CardContent>
                        <Typography gutterBottom variant='h6' component='div'>
                          {item.pname}
                        </Typography>
                        <Typography
                          variant='body2'
                          sx={{ color: 'text.secondary' }}
                        >
                          NT${numFormat(item.price)}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Link>
                </Card>
              </SwiperSlide>
            ))}
        </Swiper>
      </Box>
    </>
  );
}
