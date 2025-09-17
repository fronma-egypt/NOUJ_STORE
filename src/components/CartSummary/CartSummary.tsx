import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Divider,
  Box,
  Chip
} from '@mui/material';
import {
  MonetizationOn as MoneyIcon,
  LocalOffer as DiscountIcon,
  Receipt as ReceiptIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { CartTotals } from '../../types/cart';

const SummaryCard = styled(Card)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.background.paper}, ${theme.palette.grey[50]})`,
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[8],
  border: `1px solid ${theme.palette.grey[200]}`
}));

const PriceRow = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(1, 0),
  alignItems: 'center',
  justifyContent: 'space-between'
}));

const TotalRow = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(2),
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
  borderRadius: theme.shape.borderRadius,
  color: theme.palette.primary.contrastText,
  alignItems: 'center',
  justifyContent: 'space-between',
  marginTop: theme.spacing(2)
}));

interface CartSummaryProps {
  totals: CartTotals;
}

const CartSummary: React.FC<CartSummaryProps> = ({ totals }) => {
  return (
    <SummaryCard>
      <CardContent sx={{ p: 3 }}>
        <Stack spacing={2}>
          {/* Header */}
          <Stack direction="row" alignItems="center" spacing={1}>
            <ReceiptIcon color="primary" />
            <Typography variant="h5" fontWeight="bold" color="text.primary">
              ملخص الطلب
            </Typography>
          </Stack>

          <Divider />

          {/* Subtotal */}
          <PriceRow direction="row">
            <Stack direction="row" alignItems="center" spacing={1}>
              <MoneyIcon color="action" fontSize="small" />
              <Typography variant="body1" color="text.secondary">
                السعر قبل الخصم:
              </Typography>
            </Stack>
            <Typography variant="h6" fontWeight="bold">
              {totals.subtotal.toFixed(2)} جنيه
            </Typography>
          </PriceRow>

          {/* Discount */}
          {totals.discountAmount > 0 && (
            <PriceRow direction="row">
              <Stack direction="row" alignItems="center" spacing={1}>
                <DiscountIcon color="secondary" fontSize="small" />
                <Typography variant="body1" color="text.secondary">
                  قيمة الخصم:
                </Typography>
                <Chip 
                  label="10%" 
                  size="small" 
                  color="secondary" 
                  variant="filled"
                />
              </Stack>
              <Typography 
                variant="h6" 
                fontWeight="bold" 
                color="secondary.main"
              >
                -{totals.discountAmount.toFixed(2)} جنيه
              </Typography>
            </PriceRow>
          )}

          {/* Shipping Info */}
          <Box 
            sx={{ 
              p: 2, 
              backgroundColor: 'grey.50', 
              borderRadius: 1,
              border: '1px dashed',
              borderColor: 'grey.300'
            }}
          >
            <Typography variant="body2" color="text.secondary" textAlign="center">
              📦 خدمة التوصيل: الكيلو الأول 10 جنيه ثم كل كيلو بـ 4 جنيهات
            </Typography>
          </Box>

          {/* Final Total */}
          <TotalRow direction="row">
            <Typography variant="h5" fontWeight="bold">
              💰 الإجمالي النهائي:
            </Typography>
            <Typography variant="h4" fontWeight="bold">
              {totals.finalTotal.toFixed(2)} جنيه
            </Typography>
          </TotalRow>
        </Stack>
      </CardContent>
    </SummaryCard>
  );
};

export default CartSummary;