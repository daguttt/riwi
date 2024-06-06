import { USER_ROLES } from './constants';

import { LoginPage } from './pages/public/login/login.page';
import { RegisterPage } from './pages/public/register/register.page';
import { NotFoundPage } from './pages/public/not-found/not-found.page';

import { DashboardPage } from './pages/private/dashboard/dashboard.page';
import { CreateFlightPage } from './pages/private/create-flight/create-flight.page';
import { EditFlightPage } from './pages/private/edit-flight/edit-flight.page';

export const routes = {
    public: [
        { path: '/login', component: LoginPage },
        { path: '/register', component: RegisterPage },
        { path: '/not-found', component: NotFoundPage },
    ],
    private: [
        {
            path: '/dashboard',
            component: DashboardPage,
            forRoles: [USER_ROLES.VISITOR, USER_ROLES.ADMIN],
        },
        {
            path: '/dashboard/flights/create',
            component: CreateFlightPage,
            forRoles: [USER_ROLES.ADMIN],
        },
        {
            path: '/dashboard/flights/edit',
            component: EditFlightPage,
            forRoles: [USER_ROLES.ADMIN],
        },
    ],
};
