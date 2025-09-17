import React, { useState } from 'react';
import {
  Container,
  Typography,
  Stack,
  Button,
  Box,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Fade,
  Zoom
} from '@mui/material';
import {
  CheckCircle as CheckoutIcon,
  Delete as ClearIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useCart } from '../../hooks/useCart';
import CartItemComponent from '../CartItem/CartItem';
import CartSummary from '../CartSummary/CartSummary';
import EmptyCart from '../EmptyCart/EmptyCart';
import Header from '../Header/Header';

const PageContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(12),
  paddingBottom: theme.spacing(4),
  minHeight: '100vh'
}));

const PageTitle = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(4),
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontWeight: 'bold',
  fontSize: '2.5rem'
}));

const CheckoutButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.success.main}, ${theme.palette.success.dark})`,
  color: theme.palette.success.contrastText,
  padding: theme.spacing(2, 6),
  fontSize: '1.2rem',
  fontWeight: 'bold',
  borderRadius: theme.shape.borderRadius * 3,
  textTransform: 'none',
  boxShadow: theme.shadows[8],
  '&:hover': {
    background: `linear-gradient(135deg, ${theme.palette.success.dark}, ${theme.palette.success.main})`,
    transform: 'translateY(-3px)',
    boxShadow: theme.shadows[12]
  },
  '&:active': {
    transform: 'translateY(-1px)'
  }
}));

const ClearCartButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.error.main}, ${theme.palette.error.dark})`,
  color: theme.palette.error.contrastText,
  padding: theme.spacing(1.5, 4),
  fontWeight: 'bold',
  borderRadius: theme.shape.borderRadius * 2,
  textTransform: 'none',
  '&:hover': {
    background: `linear-gradient(135deg, ${theme.palette.error.dark}, ${theme.palette.error.main})`,
    transform: 'translateY(-2px)'
  }
}));

const Cart: React.FC = () => {
  const {
    items,
    removeFromCart,
    updateItemQuantity,
    clearCartItems,
    getCartTotals,
    getCartItemsCount,
    isCartEmpty
  } = useCart();

  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error' | 'info';
  }>({
    open: false,
    message: '',
    severity: 'success'
  });

  const [clearDialogOpen, setClearDialogOpen] = useState(false);

  const totals = getCartTotals();
  const cartItemsCount = getCartItemsCount();

  const showSnackbar = (message: string, severity: 'success' | 'error' | 'info' = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    updateItemQuantity(id, quantity);
    if (quantity === 0) {
      showSnackbar('🗑️ تم حذف المنتج', 'error');
    } else {
      showSnackbar('✅ تم تعديل الكمية', 'info');
    }
  };

  const handleRemoveItem = (id: string) => {
    removeFromCart(id);
    showSnackbar('❌ تم إزالة المنتج', 'error');
  };

  const handleClearCart = () => {
    clearCartItems();
    setClearDialogOpen(false);
    showSnackbar('🗑️ تم مسح جميع المنتجات', 'error');
  };

  const handleCheckout = () => {
    if (isCartEmpty()) {
      showSnackbar('🛒 السلة فارغة!', 'error');
      return;
    }
    window.location.href = 'checkout.html';
  };

  if (isCartEmpty()) {
    return (
      <>
        <Header cartItemsCount={0} />
        <PageContainer maxWidth="lg">
          <PageTitle>
            🛒 سلة المشتريات
          </PageTitle>
          <EmptyCart />
        </PageContainer>
      </>
    );
  }

  return (
    <>
      <Header cartItemsCount={cartItemsCount} />
      <PageContainer maxWidth="lg">
        <Fade in timeout={800}>
          <Box>
            <PageTitle>
              🛒 سلة المشتريات
            </PageTitle>

            <Stack spacing={4}>
              {/* Cart Items */}
              <Stack spacing={3}>
                {Object.values(items).map((item, index) => (
                  <Zoom 
                    key={item.id} 
                    in 
                    timeout={500 + (index * 100)}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <Box>
                      <CartItemComponent
                        item={item}
                        onUpdateQuantity={handleUpdateQuantity}
                        onRemove={handleRemoveItem}
                      />
                    </Box>
                  </Zoom>
                ))}
              </Stack>

              {/* Cart Summary */}
              <Fade in timeout={1000}>
                <Box>
                  <CartSummary totals={totals} />
                </Box>
              </Fade>

              {/* Action Buttons */}
              <Fade in timeout={1200}>
                <Stack 
                  direction={{ xs: 'column', sm: 'row' }} 
                  spacing={2} 
                  justifyContent="center"
                  alignItems="center"
                >
                  <CheckoutButton
                    variant="contained"
                    size="large"
                    startIcon={<CheckoutIcon />}
                    onClick={handleCheckout}
                  >
                    ✅ إتمام الطلب
                  </CheckoutButton>

                  <ClearCartButton
                    variant="contained"
                    size="medium"
                    startIcon={<ClearIcon />}
                    onClick={() => setClearDialogOpen(true)}
                  >
                    مسح السلة
                  </ClearCartButton>
                </Stack>
              </Fade>
            </Stack>
          </Box>
        </Fade>

        {/* Clear Cart Confirmation Dialog */}
        <Dialog
          open={clearDialogOpen}
          onClose={() => setClearDialogOpen(false)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>
            <Typography variant="h5" fontWeight="bold">
              🗑️ مسح السلة
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Typography variant="body1">
              هل أنت متأكد من أنك تريد مسح جميع المنتجات من السلة؟
              هذا الإجراء لا يمكن التراجع عنه.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button 
              onClick={() => setClearDialogOpen(false)}
              color="primary"
            >
              إلغاء
            </Button>
            <Button 
              onClick={handleClearCart}
              color="error"
              variant="contained"
            >
              نعم، امسح السلة
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar for notifications */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
          <Alert 
            onClose={handleCloseSnackbar} 
            severity={snackbar.severity}
            variant="filled"
            sx={{ fontWeight: 'bold' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </PageContainer>
    </>
  );
};

export default Cart;