import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Stack,
  Box,
  Chip,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Fade,
  useTheme
} from '@mui/material';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  Delete as DeleteIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { CartItem as CartItemType } from '../../types/cart';

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius * 2,
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  overflow: 'hidden',
  position: 'relative',
  '&:hover': {
    transform: 'translateY(-8px) scale(1.02)',
    boxShadow: theme.shadows[12]
  }
}));

const ProductImage = styled('img')(({ theme }) => ({
  width: 140,
  height: 140,
  objectFit: 'cover',
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.grey[200]}`,
  transition: 'transform 0.4s ease',
  '&:hover': {
    transform: 'scale(1.1) rotate(-1deg)'
  }
}));

const DiscountBadge = styled(Chip)(({ theme }) => ({
  position: 'absolute',
  top: 10,
  left: 10,
  background: `linear-gradient(135deg, ${theme.palette.error.main}, ${theme.palette.secondary.main})`,
  color: theme.palette.error.contrastText,
  fontWeight: 'bold',
  transform: 'rotate(-5deg)',
  boxShadow: theme.shadows[4]
}));

const QuantityButton = styled(IconButton)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
  color: theme.palette.primary.contrastText,
  width: 40,
  height: 40,
  '&:hover': {
    background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
    transform: 'scale(1.1)'
  }
}));

const DeleteButton = styled(IconButton)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.error.main}, ${theme.palette.error.dark})`,
  color: theme.palette.error.contrastText,
  width: 48,
  height: 48,
  '&:hover': {
    background: `linear-gradient(135deg, ${theme.palette.error.dark}, ${theme.palette.error.main})`,
    transform: 'scale(1.2) rotate(8deg)',
    boxShadow: theme.shadows[8]
  }
}));

const StyledTable = styled(Table)(({ theme }) => ({
  '& .MuiTableCell-root': {
    border: 'none',
    padding: '4px 8px'
  },
  '& .MuiTableRow-root:nth-of-type(even)': {
    backgroundColor: theme.palette.grey[50]
  }
}));

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

const CartItemComponent: React.FC<CartItemProps> = ({ 
  item, 
  onUpdateQuantity, 
  onRemove 
}) => {
  const theme = useTheme();

  const handleQuantityChange = (delta: number) => {
    const newQuantity = item.quantity + delta;
    if (newQuantity > 0) {
      onUpdateQuantity(item.id, newQuantity);
    }
  };

  const handleRemove = () => {
    onRemove(item.id);
  };

  const itemTotal = item.price * item.quantity;

  return (
    <Fade in timeout={700}>
      <StyledCard>
        <CardContent sx={{ p: 3 }}>
          <Stack direction="row" spacing={3} alignItems="center">
            {/* Product Image */}
            <Box position="relative" flexShrink={0}>
              <ProductImage
                src={item.image}
                alt={`${item.name} - صورة المنتج`}
              />
              {item.discount && item.discount > 0 && (
                <DiscountBadge
                  label={`خصم ${item.discount}%`}
                  size="small"
                />
              )}
            </Box>

            {/* Product Details */}
            <Box flex={1}>
              <Typography 
                variant="h5" 
                fontWeight="bold" 
                color="text.primary"
                mb={2}
                sx={{ letterSpacing: '-0.5px' }}
              >
                {item.name}
              </Typography>

              <StyledTable size="small">
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary" fontWeight={600}>
                        الوحدة
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight={700}>
                        {item.unit || 'قطعة'}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary" fontWeight={600}>
                        السعر
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight={700}>
                        {item.price} جنيه
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary" fontWeight={600}>
                        الكمية
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" fontWeight={700}>
                        {item.quantity}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary" fontWeight={600}>
                        الإجمالي
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography 
                        variant="body1" 
                        fontWeight={700} 
                        color="success.main"
                      >
                        {itemTotal.toFixed(2)} جنيه
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </StyledTable>
            </Box>

            {/* Actions */}
            <Stack spacing={2} alignItems="center">
              {/* Quantity Controls */}
              <Stack direction="row" spacing={1} alignItems="center">
                <QuantityButton
                  size="small"
                  onClick={() => handleQuantityChange(1)}
                  aria-label="زيادة الكمية"
                >
                  <AddIcon fontSize="small" />
                </QuantityButton>
                
                <Typography 
                  variant="h6" 
                  fontWeight="bold" 
                  sx={{ minWidth: 30, textAlign: 'center' }}
                >
                  {item.quantity}
                </Typography>
                
                <QuantityButton
                  size="small"
                  onClick={() => handleQuantityChange(-1)}
                  aria-label="تقليل الكمية"
                >
                  <RemoveIcon fontSize="small" />
                </QuantityButton>
              </Stack>

              {/* Delete Button */}
              <DeleteButton
                onClick={handleRemove}
                aria-label="حذف المنتج"
              >
                <DeleteIcon />
              </DeleteButton>
            </Stack>
          </Stack>
        </CardContent>
      </StyledCard>
    </Fade>
  );
};

export default CartItemComponent;