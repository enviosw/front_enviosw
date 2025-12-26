// routes/config.ts
import { lazy } from 'react';
import { RouteConfig } from '../shared/types/routesInterface';
// Define todas las rutas de la aplicación aquí
export const routesConfig: RouteConfig[] = [
    {
        path: '/',
        element: lazy(() => import('../pages/public/Home')),
        requiresAuth: false,
        useLayout: true,
        useAdminLayout: false
    },
 
    {
        path: '/turnos-domi-publico',
        element: lazy(() => import('../pages/public/ListDomi')),
        requiresAuth: false,
        useLayout: false,
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
        path: '/comercio/:id/productos',
        element: lazy(() => import('../pages/public/LocalComercial')),
        requiresAuth: false,
        useLayout: false,
        useAdminLayout: false
    },
   {
        path: '/turnnoss-app',
        element: lazy(() => import('../pages/admin/Turnos')),
        requiresAuth: true,
        rol: 'administrador',
        useLayout: false,
        useAdminLayout: true
    },


    {
        path: '/comercios',
        element: lazy(() => import('../pages/admin/Comercios')),
        requiresAuth: true,
        rol: 'administrador',
        useLayout: false,
        useAdminLayout: true
    },
    {
        path: '/domicilios',
        element: lazy(() => import('../pages/admin/Domicilios')),
        requiresAuth: true,
        rol: 'administrador',
        useLayout: false,
        useAdminLayout: true
    },
     {
        path: '/publicidad',
        element: lazy(() => import('../pages/admin/Publicidad')),
        requiresAuth: true,
        rol: 'administrador',
        useLayout: false,
        useAdminLayout: true
    },
    {
        path: '/domicilios-pendientes',
        element: lazy(() => import('../pages/admin/DomiciliosPendientes')),
        requiresAuth: true,
        rol: 'administrador',
        useLayout: false,
        useAdminLayout: true
    },
    {
        path: '/domicilios-urgentes',
        element: lazy(() => import('../pages/admin/DomiciliosPendientes')),
        requiresAuth: false,
        useLayout: false,
        useAdminLayout: false
    },
    {
        path: '/dashboard',
        element: lazy(() => import('../pages/admin/Dashboard')),
        requiresAuth: true,
        rol: 'administrador',
        useLayout: false,
        useAdminLayout: true
    },
    {
        path: '/precios',
        element: lazy(() => import('../pages/admin/PreciosPage')),
        requiresAuth: true,
        rol: 'administrador',
        useLayout: false,
        useAdminLayout: true
    },
    {
        path: '/publicidad',
        element: lazy(() => import('../pages/admin/ImagenesPage')),
        requiresAuth: true,
        rol: 'administrador',
        useLayout: false,
        useAdminLayout: true
    },
    {
        path: '/domiciliarios',
        element: lazy(() => import('../pages/admin/Domiciliarios')),
        requiresAuth: true,
        rol: 'administrador',
        useLayout: false,
        useAdminLayout: true
    },
    {
        path: '/chats',
        element: lazy(() => import('../pages/admin/ChatApp')),
        requiresAuth: true,
        rol: 'administrador',
        useLayout: false,
        useAdminLayout: true
    },
    {
        path: '/clientes',
        element: lazy(() => import('../pages/admin/Clientes')),
        requiresAuth: true,
        rol: 'administrador',
        useLayout: false,
        useAdminLayout: true
    },
    {
        path: '/tarifas',
        element: lazy(() => import('../pages/admin/Tarifas')),
        requiresAuth: true,
        rol: 'administrador',
        useLayout: false,
        useAdminLayout: true
    },
    {
        path: '/reportes',
        element: lazy(() => import('../pages/admin/Reportes')),
        requiresAuth: true,
        rol: 'administrador',
        useLayout: false,
        useAdminLayout: true
    },
    {
        path: '/configuraciones',
        element: lazy(() => import('../pages/admin/Configuraciones')),
        requiresAuth: true,
        rol: 'administrador',
        useLayout: false,
        useAdminLayout: true
    },
    {
        path: '/perfil',
        element: lazy(() => import('../pages/admin/Perfil')),
        requiresAuth: true,
        rol: 'administrador',
        useLayout: false,
        useAdminLayout: true
    },
    {
        path: '/usuarios',
        element: lazy(() => import('../pages/admin/Usuarios')),
        requiresAuth: true,
        rol: 'administrador',
        useLayout: false,
        useAdminLayout: true
    },
    {
        path: '/mi-comercio',
        element: lazy(() => import('../pages/comercios/MiComercio')),
        requiresAuth: true,
        rol: 'aliado',
        useLayout: false,
        useAdminLayout: false
    },
    {
        path: '/politicas-de-privacidad',
        element: lazy(() => import('../pages/public/PoliticasPrivacidad')),
        requiresAuth: false,
        useLayout: false,
        useAdminLayout: false
    },
    {
        path: "/terminos-y-condiciones-domiciliosw",
        element: lazy(() => import('../pages/public/TerminosYCondiciones')),
        requiresAuth: false,
        useLayout: false,
        useAdminLayout: false
    },
    {
        path: "/autorizacion-tratmiento-de-datos-personales-domiciliosw",
        element: lazy(() => import('../pages/public/AutorizacionDatosPersonales')),
        requiresAuth: false,
        useLayout: false,
        useAdminLayout: false
    },
    {
        path: "/politicas-de-cookies-domiciliosw",
        element: lazy(() => import('../pages/public/PoliticasCookies')),
        requiresAuth: false,
        useLayout: false,
        useAdminLayout: false
    },
    {
        path: "/comercios/registrar-mi-negocio",
        element: lazy(() => import('../pages/public/RegistrarNegocioPage')),
        requiresAuth: false,
        useLayout: false,
        useAdminLayout: false
    },
    {
        path: "/domiciliarios/quiero-ser-domiciliario",
        element: lazy(() => import('../pages/public/RegistrarDomiciliarioPage')),
        requiresAuth: false,
        useLayout: false,
        useAdminLayout: false
    },
];
