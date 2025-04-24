// routes/AppRouter.tsx
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { routesConfig } from './config';
import ProtectedRoute from './ProtectedRoute';
import MainLayout from '../layout/MainLayout';
import Loader from '../utils/Loader';
import { ModalProvider } from '../context/ModalContext';
import { CartProvider } from '../context/CartContext';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <ModalProvider>
        <CartProvider>
          <Suspense fallback={<Loader />}>
            <Routes>
              {routesConfig.map(({ path, element: Element, requiresAuth, useLayout }) => {
                let content = <Element />;

                if (requiresAuth) {
                  content = <ProtectedRoute>{content}</ProtectedRoute>;
                }

                if (useLayout) {
                  content = <MainLayout>{content}</MainLayout>;
                }

                return <Route path={path} element={content} key={path} />;
              })}
            </Routes>
          </Suspense>
        </CartProvider>


      </ModalProvider>
    </Router >
  );
};

export default AppRouter;
