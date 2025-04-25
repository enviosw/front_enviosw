// routes/AppRouter.tsx
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { routesConfig } from './config';
import ProtectedRoute from './ProtectedRoute';
import MainLayout from '../shared/layout/MainLayout';
import Loader from '../utils/Loader';

import AdminLayout from '../shared/layout/AdminLayout';

const AppRouter: React.FC = () => {
  return (
    <Router>

      <Suspense fallback={<Loader />}>
        <Routes>
          {routesConfig.map(({ path, element: Element, requiresAuth, useLayout, useAdminLayout }) => {
            let content = <Element />;

            if (requiresAuth) {
              content = <ProtectedRoute>{content}</ProtectedRoute>;
            }

            if (useLayout) {
              content = <MainLayout>{content}</MainLayout>;
            }

            if (useAdminLayout) {
              content = <AdminLayout>{content}</AdminLayout>;
            }

            return <Route path={path} element={content} key={path} />;
          })}
        </Routes>
      </Suspense>

    </Router >
  );
};

export default AppRouter;
