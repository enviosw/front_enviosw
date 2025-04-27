// routes/config.ts
import { lazy } from 'react';

export const routesConfig = [
    {
        path: '/',
        element: lazy(() => import('../pages/public/Home')),
        requiresAuth: false,
        useLayout: true,
        useAdminLayout: false
    },
    {
        path: '/login',
        element: lazy(() => import('../pages/public/Login')),
        requiresAuth: false,
        useLayout: false,
        useAdminLayout: false
    },
    {
        path: '*',
        element: lazy(() => import('../pages/public/NotFound')),
        requiresAuth: false,
        useLayout: false,
        useAdminLayout: false
    },
    {
        path: '/local/:id',
        element: lazy(() => import('../pages/public/LocalComercial')),
        requiresAuth: false,
        useLayout: false,
        useAdminLayout: false
    },

    {
        path: '/producto',
        element: lazy(() => import('../pages/public/ProductPage')),
        requiresAuth: false,
        useLayout: false,
        useAdminLayout: false
    },

    {
        path: '/comercios',
        element: lazy(() => import('../pages/admin/Comercios')),
        requiresAuth: false,
        useLayout: false,
        useAdminLayout: true
    },
    {
        path: '/dashboard',
        element: lazy(() => import('../pages/admin/Dashboard')),
        requiresAuth: false,
        useLayout: false,
        useAdminLayout: true
    },
    {
        path: '/clientes',
        element: lazy(() => import('../pages/admin/Clientes')),
        requiresAuth: false,
        useLayout: false,
        useAdminLayout: true
    },
    {
        path: '/tarifas',
        element: lazy(() => import('../pages/admin/Tarifas')),
        requiresAuth: false,
        useLayout: false,
        useAdminLayout: true
    },
    {
        path: '/reportes',
        element: lazy(() => import('../pages/admin/Reportes')),
        requiresAuth: false,
        useLayout: false,
        useAdminLayout: true
    },
    {
        path: '/configuraciones',
        element: lazy(() => import('../pages/admin/Configuraciones')),
        requiresAuth: false,
        useLayout: false,
        useAdminLayout: true
    },
    {
        path: '/perfil',
        element: lazy(() => import('../pages/admin/Perfil')),
        requiresAuth: false,
        useLayout: false,
        useAdminLayout: true
    },
    {
        path: '/usuarios',
        element: lazy(() => import('../pages/admin/Usuarios')),
        requiresAuth: false,
        useLayout: false,
        useAdminLayout: true
    },

];
