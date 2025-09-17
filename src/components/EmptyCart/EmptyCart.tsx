import React from 'react';
import {
  Box,
  Typography,
  Button,
  Stack,
  Card,
  CardContent
} from '@mui/material';
import {
  ShoppingCart as CartIcon,
  ArrowBack as BackIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const EmptyCartCard = styled(Card)(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(6),
  background: `linear-gradient(135deg, ${theme.palette.background.paper}, ${theme.palette.grey[50]})`,
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[4]
}));

const EmptyCartIcon = styled(CartIcon)(({ theme }) => ({
  fontSize: 120,
  color: theme.palette.grey[400],
  marginBottom: theme.spacing(2)
}));

const ContinueShoppingButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(1.5, 4),
  borderRadius: theme.shape.borderRadius * 2,
  fontSize: '1.1rem',
  fontWeight: 'bold',
  textTransform: 'none',
  '&:hover': {
    background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[8]
  }
}));

interface EmptyCartProps {
  onContinueShopping?: () => void;
}

const EmptyCart: React.FC<EmptyCartProps> = ({ onContinueShopping }) => {
  const handleContinueShopping = () => {
    if (onContinueShopping) {
      onContinueShopping();
    } else {
      window.location.href = 'products.html';
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
      <EmptyCartCard>
        <CardContent>
          <Stack spacing={3} alignItems="center">
            <EmptyCartIcon />
            
            <Typography variant="h4" fontWeight="bold" color="text.primary">
              🛒 السلة فارغة
            </Typography>
            
            <Typography variant="body1" color="text.secondary" maxWidth="400px">
              لم تقم بإضافة أي منتجات إلى سلة التسوق بعد. 
              تصفح مجموعتنا الرائعة من المنتجات وابدأ التسوق الآن!
            </Typography>
            
            <ContinueShoppingButton
              variant="contained"
              startIcon={<BackIcon />}
              onClick={handleContinueShopping}
              size="large"
            >
              تصفح المنتجات
            </ContinueShoppingButton>
          </Stack>
        </CardContent>
      </EmptyCartCard>
    </Box>
  );
};

export default EmptyCart;