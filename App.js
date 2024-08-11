import React from 'react';
import { Provider } from 'react-redux';
import store from './src/store/store';
import ProductList from './src/components/ProductList';

export default function App() {
  return (
    <Provider store={store}>
      <ProductList />
    </Provider>
  );
}
