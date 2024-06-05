import { LoginPage } from './pages/public/login/login.page';
import { RegisterPage } from './pages/public/register/register.page';
import { NotFoundPage } from './pages/public/not-found/not-found.page';

import { DashboardPage } from './pages/private/dashboard/dashboard.page';

export const routes = {
    public: [
        { path: '/login', component: LoginPage },
        { path: '/register', component: RegisterPage },
        { path: '/not-found', component: NotFoundPage },
    ],
    private: [
        { path: '/dashboard', component: DashboardPage },
        { path: '/dashboard/flights/edit', component: function () {} },
    ],
};
