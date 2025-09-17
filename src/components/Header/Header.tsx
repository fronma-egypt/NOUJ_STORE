import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Stack,
  Badge,
  IconButton,
  Box
} from '@mui/material';
import {
  ShoppingCart as CartIcon,
  Home as HomeIcon,
  Inventory as ProductsIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
  boxShadow: theme.shadows[8]
}));

const Logo = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '1.8rem',
  color: theme.palette.secondary.main,
  textShadow: '0 2px 4px rgba(0,0,0,0.3)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
    textShadow: `0 0 10px ${theme.palette.secondary.light}, 0 0 20px ${theme.palette.secondary.main}`
  }
}));

const NavLink = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  fontSize: '1.1rem',
  fontWeight: 600,
  cursor: 'pointer',
  padding: theme.spacing(1, 2),
  borderRadius: theme.shape.borderRadius,
  transition: 'all 0.3s ease',
  position: 'relative',
  '&:hover': {
    backgroundColor: 'rgba(255,255,255,0.1)',
    transform: 'translateY(-2px)'
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    left: 0,
    bottom: 0,
    height: 2,
    width: 0,
    backgroundColor: theme.palette.secondary.main,
    transition: 'width 0.3s ease'
  },
  '&:hover::after': {
    width: '100%'
  }
}));

const CartBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
    fontWeight: 'bold',
    fontSize: '0.8rem',
    minWidth: 20,
    height: 20,
    animation: 'pulse 2s infinite'
  },
  '@keyframes pulse': {
    '0%': { transform: 'scale(1)' },
    '50%': { transform: 'scale(1.2)' },
    '100%': { transform: 'scale(1)' }
  }
}));

interface HeaderProps {
  cartItemsCount: number;
}

const Header: React.FC<HeaderProps> = ({ cartItemsCount }) => {
  const handleNavigation = (path: string) => {
    window.location.href = path;
  };

  return (
    <StyledAppBar position="fixed">
      <Toolbar>
        <Stack 
          direction="row" 
          justifyContent="space-between" 
          alignItems="center" 
          width="100%"
        >
          {/* Logo */}
          <Logo>
            NOUJ STORE
          </Logo>

          {/* Navigation */}
          <Stack direction="row" spacing={2} alignItems="center">
            <Stack direction="row" alignItems="center" spacing={1}>
              <HomeIcon />
              <NavLink onClick={() => handleNavigation('index.html')}>
                الرئيسية
              </NavLink>
            </Stack>

            <Stack direction="row" alignItems="center" spacing={1}>
              <ProductsIcon />
              <NavLink onClick={() => handleNavigation('products.html')}>
                المنتجات
              </NavLink>
            </Stack>

            {/* Cart Icon with Badge */}
            <IconButton 
              color="inherit" 
              onClick={() => handleNavigation('cart.html')}
              sx={{ 
                ml: 2,
                '&:hover': {
                  transform: 'scale(1.1)',
                  backgroundColor: 'rgba(255,255,255,0.1)'
                }
              }}
            >
              <CartBadge badgeContent={cartItemsCount} color="error">
                <CartIcon fontSize="large" />
              </CartBadge>
            </IconButton>
          </Stack>
        </Stack>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header;