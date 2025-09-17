import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  direction: 'rtl',
  palette: {
    primary: {
      main: '#6200ea',
      light: '#9c4dcc',
      dark: '#5000c0',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#ff9f00',
      light: '#FFD700',
      dark: '#e68900',
      contrastText: '#000000'
    },
    error: {
      main: '#ff1744',
      light: '#ff5983',
      dark: '#d50000',
      contrastText: '#ffffff'
    },
    success: {
      main: '#4caf50',
      light: '#81c784',
      dark: '#2e7d32',
      contrastText: '#ffffff'
    },
    background: {
      default: '#dce8f8',
      paper: '#ffffff'
    },
    text: {
      primary: '#2c2c54',
      secondary: '#555555'
    },
    grey: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#eeeeee',
      300: '#e0e0e0',
      400: '#bdbdbd',
      500: '#9e9e9e',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121'
    }
  },
  typography: {
    fontFamily: 'Cairo, sans-serif',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 600,
    fontWeightBold: 700,
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: '#2c2c54'
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700,
      color: '#2c2c54'
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      color: '#2c2c54'
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      color: '#2c2c54'
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      color: '#2c2c54'
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      color: '#2c2c54'
    }
  },
  shape: {
    borderRadius: 12
  },
  shadows: [
    'none',
    '0 2px 4px rgba(0,0,0,0.1)',
    '0 4px 8px rgba(0,0,0,0.1)',
    '0 6px 12px rgba(0,0,0,0.1)',
    '0 8px 16px rgba(0,0,0,0.1)',
    '0 10px 20px rgba(0,0,0,0.1)',
    '0 12px 24px rgba(0,0,0,0.1)',
    '0 14px 28px rgba(0,0,0,0.1)',
    '0 16px 32px rgba(0,0,0,0.1)',
    '0 18px 36px rgba(0,0,0,0.1)',
    '0 20px 40px rgba(0,0,0,0.1)',
    '0 22px 44px rgba(0,0,0,0.1)',
    '0 24px 48px rgba(0,0,0,0.1)',
    '0 26px 52px rgba(0,0,0,0.1)',
    '0 28px 56px rgba(0,0,0,0.1)',
    '0 30px 60px rgba(0,0,0,0.1)',
    '0 32px 64px rgba(0,0,0,0.1)',
    '0 34px 68px rgba(0,0,0,0.1)',
    '0 36px 72px rgba(0,0,0,0.1)',
    '0 38px 76px rgba(0,0,0,0.1)',
    '0 40px 80px rgba(0,0,0,0.1)',
    '0 42px 84px rgba(0,0,0,0.1)',
    '0 44px 88px rgba(0,0,0,0.1)',
    '0 46px 92px rgba(0,0,0,0.1)',
    '0 48px 96px rgba(0,0,0,0.1)'
  ]
});

export default theme;