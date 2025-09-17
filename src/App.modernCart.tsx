import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';
import theme from './theme';
import { store } from './store';
import Cart from './components/Cart/Cart';

// Create RTL cache
const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

const App: React.FC = () => {
  // Mock data for demonstration
  React.useEffect(() => {
    // Add some mock items to localStorage for demonstration
    const mockCartItems = {
      'prod12': {
        id: 'prod12',
        name: 'كرتونة 12 وجبة',
        price: 360,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1720174640607-def5c12a033d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwyfHxjYXJkYm9hcmQlMjBib3glMjBwYWNrYWdlJTIwc2hpcHBpbmd8ZW5|MHwyfHx8MTc1NjU1OTk3MXww&ixlib=rb-4.1.0&q=85',
        unit: 'كرتونة',
        discount: 10
      },
      'prod10': {
        id: 'prod10',
        name: 'كرتونة شاي دودز 6 علبة 12 عبوة 1 معلقة سكر',
        price: 1728,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1578920181445-0a0b285b9757?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHw2fHx0ZWElMjBib3glMjBwYWNrYWdlJTIwdHJhZGl0aW9uYWx8ZW58MHwyfHx8MTc1NjU1OTk3MXww&ixlib=rb-4.1.0&q=85',
        unit: 'كرتونة',
        discount: 0
      },
      'prod11': {
        id: 'prod11',
        name: 'كرتونة شاي دودز 6 علبة 12 عبوة 2 معلقة سكر',
        price: 1728,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1623658179698-ec7b295754d0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwyfHx0ZWElMjBib3glMjBwYWNrYWdlJTIwdHJhZGl0aW9uYWx8ZW58MHwyfHx8MTc1NjU1OTk3MXww&ixlib=rb-4.1.0&q=85',
        unit: 'كرتونة',
        discount: 5
      },
      'prod7': {
        id: 'prod7',
        name: 'علبة شاي دودز 12 عبوة 1 معلقة سكر',
        price: 288,
        quantity: 3,
        image: 'https://images.unsplash.com/photo-1716540103530-cc33cdd20cde?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHw5fHx0ZWElMjBib3glMjBwYWNrYWdlJTIwdHJhZGl0aW9uYWx8ZW58MHwyfHx8MTc1NjU1OTk3MXww&ixlib=rb-4.1.0&q=85',
        unit: 'علبة',
        discount: 0
      }
    };

    // Only set mock data if cart is empty
    const existingCart = localStorage.getItem('cart');
    if (!existingCart || existingCart === '{}') {
      localStorage.setItem('cart', JSON.stringify(mockCartItems));
    }
  }, []);

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={store}>
          <Cart />
        </Provider>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default App;