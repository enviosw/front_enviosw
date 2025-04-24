// routes/config.ts
import { lazy } from 'react';

export const routesConfig = [
    {
        path: '/',
        element: lazy(() => import('../pages/public/Home')),
        requiresAuth: false,
        useLayout: true,
    },
    {
        path: '/login',
        element: lazy(() => import('../pages/public/Login')),
        requiresAuth: false,
        useLayout: false,
    },
    {
        path: '/dashboard',
        element: lazy(() => import('../pages/admin/Dashboard')),
        requiresAuth: true,
        useLayout: true,
    },
    {
        path: '*',
        element: lazy(() => import('../pages/public/NotFound')),
        requiresAuth: false,
        useLayout: false,
    },
    {
        path: '/restaurante/:id',
        element: lazy(() => import('../pages/public/Restaurante')),
        requiresAuth: false,
        useLayout: false,
    },

    {
        path: '/producto',
        element: lazy(() => import('../pages/public/ProductPage')),
        requiresAuth: false,
        useLayout: false,
    },
];
