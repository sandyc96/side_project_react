import {
  Box,
  Grid,
  ImageList,
  ImageListItem,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import MyBreadcrumbs from '../component/product/MyBreadcrumbs';
import ProductDetail from '../component/product/ProductDetail';
import { AllProduct, category } from '../MyData';
import { useCart } from '../context/CartContext';

export default function ProductPage() {
  const { clickedInfo } = useCart();

  const { pId } = useParams();

  const [pDetails, setPDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    const fetchItem = async () => {
      try {
        const data = AllProduct[pId - 1];
        if (data) {
          setPDetails(data);
        } else {
          throw new Error('Item not found');
        }
      } catch (err) {
        console.error('Error fetching item:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [pId]);

  if (loading) {
    return <div>Loading item details...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!pDetails) {
    return <div>No item details available.</div>;
  }

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          size={12}
          position={{ md: 'fixed' }}
          px={2}
          top={'60px'}
          width={'100%'}
          bgcolor={'white'}
          zIndex={1}
        >
          <MyBreadcrumbs />
        </Grid>
        <Grid
          container
          display={{ xs: 'grid', md: 'flex' }}
          gridTemplateRows={{ xs: 'auto auto' }}
          spacing={1}
          my='40px'
          width='100%'
        >
          <Grid
            size={3}
            position={{ md: 'fixed' }}
            ml={5}
            display={{ xs: 'none', md: 'initial' }}
          >
            <List
              sx={{
                p: 0,
                color: 'primary.dark',
                mx: 'auto',
              }}
            >
              <ListItem sx={{ p: 0 }}>
                <ListItemButton
                  component={Link}
                  to='/new_in'
                  sx={{
                    py: 0.5,
                    '&:hover': {
                      bgcolor: 'transparent',
                      '& .MuiListItemText-primary': { fontWeight: 500 },
                    },
                  }}
                >
                  <ListItemText primary='新品優惠兩件95折' />
                </ListItemButton>
              </ListItem>
              <ListItem sx={{ p: 0 }}>
                <ListItemButton
                  sx={{
                    py: 0.5,
                    '&:hover': {
                      bgcolor: 'transparent',
                      '& .MuiListItemText-primary': { fontWeight: 500 },
                    },
                  }}
                >
                  <ListItemText primary='所有商品 | All' />
                </ListItemButton>
              </ListItem>
              {category.map((text) => (
                <ListItem sx={{ py: 0.2 }} key={text}>
                  <ListItemButton
                    sx={{
                      py: 0,
                      '&:hover': {
                        bgcolor: 'transparent',
                        '& .MuiListItemText-primary': { fontWeight: 500 },
                      },
                    }}
                  >
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Grid>
          <Grid
            size={{ xs: 12, md: 4 }}
            width={{ xs: '90%', sm: '80%', md: '33.3%' }}
            ml={{ md: '30%' }}
            mx={{ xs: 'auto' }}
            gridRow={{ xs: 2 }}
          >
            <ImageList cols={1} gap={0}>
              {clickedInfo.image.map((images) => (
                <ImageListItem key={images}>
                  <img style={{ width: '100%' }} src={images} loading='lazy' />
                </ImageListItem>
              ))}
            </ImageList>
          </Grid>
          <Grid
            size={{ xs: 12, md: 5 }}
            position={{ md: 'fixed' }}
            width={{ xs: '90%', sm: '80%', md: '33.3%' }}
            p={{ md: 1 }}
            mx={{ xs: 'auto', md: 0 }}
            ml={{ md: '66.6%' }}
            gridRow={{ xs: 1 }}
          >
            <ProductDetail />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
