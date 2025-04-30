import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { routesConfig } from './config';
import MainLayout from '../shared/layout/MainLayout';
import AdminLayout from '../shared/layout/AdminLayout';
import Loader from '../utils/Loader';
import { AuthProvider } from '../context/AuthContext';
import RoleProtectedRoute from './RoleProtectedRoute';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Suspense fallback={<Loader />}>
          <Routes>
            {routesConfig.map(({ path, element: Element, requiresAuth, useLayout, useAdminLayout, rol }) => {
              let content = <Element />;

              // ✅ APLICA LAYOUTS PRIMERO
              if (useLayout) {
                content = <MainLayout>{content}</MainLayout>;
              }

              if (useAdminLayout) {
                content = <AdminLayout>{content}</AdminLayout>;
              }

              console.log(path, requiresAuth, useLayout, useAdminLayout, rol)

              // ✅ PROTEGE DESPUÉS DE APLICAR LAYOUT
              if (requiresAuth && rol) {
                content = (
                  <RoleProtectedRoute requiredRole={rol}>
                    {content}
                  </RoleProtectedRoute>
                );
              }

              return <Route path={path} element={content} key={path} />;
            })}
          </Routes>
        </Suspense>
      </AuthProvider>
    </Router>
  );
};

export default AppRouter;
