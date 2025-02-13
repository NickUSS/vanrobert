export const ROUTES = {
    HOME: '/',
    ARTE: '/arte',
    MODA: '/moda',
    FORO: '/foro',
    EVENTOS: '/eventos',
    BLOG: '/blog',
    LOGIN: '/login',
    REGISTRO: '/registro',
    PERFIL: '/perfil',
    COLECCION: '/coleccion',
} as const;

export const NAV_LINKS = [
    { name: 'Arte', href: ROUTES.ARTE },
    { name: 'Moda', href: ROUTES.MODA },
    { name: 'Foro', href: ROUTES.FORO },
    { name: 'Eventos', href: ROUTES.EVENTOS },
];