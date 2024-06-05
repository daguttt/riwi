import { PrivateLayout } from './layouts/private/private-layout';
import { routes } from './routes';

export function navigateTo(targetPath) {
    window.history.pushState({}, '', targetPath);
    Router();
}

export function Router() {
    const currentPath = window.location.pathname;
    const currentSearchParams = new URLSearchParams(window.location.search);

    const token = localStorage.getItem('token');
    const hasActiveSession =
        (currentPath === '/login' || currentPath === '/register') && token;
    if (hasActiveSession) return navigateTo('/dashboard');

    const publicRoute = routes.public.find(
        (route) => route.path === currentPath,
    );
    const privateRoute = routes.private.find(
        (route) => route.path === currentPath,
    );

    if (publicRoute) {
        publicRoute.component();
        return;
    }

    if (privateRoute && token) {
        const { html, logic } = privateRoute.component(currentSearchParams);
        PrivateLayout(html, logic);
        return;
    }

    if (privateRoute && !token) {
        return navigateTo('/login');
    }

    console.warn(`Ruta '${currentPath}' no encontrada.`);
    navigateTo('/not-found');
}

window.onpopstate = Router;
