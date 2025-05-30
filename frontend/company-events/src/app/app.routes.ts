import { Routes } from '@angular/router';
import { canActivateAuthRole } from './guards/auth-role.guard';

export const routes: Routes = [
    { 
        path: '',
        loadComponent: () => import('./shell/shell.component').then(m => m.ShellComponent),
        children: [
            {
                path: 'events',
                canActivate: [canActivateAuthRole],
                data: { role: ['admin', 'user'] }, // Protected route
                loadChildren: () => import('@company/core/events-view/events.routing').then(m => m.default)
            },
            {
                path: '',
                canActivate: [canActivateAuthRole],
                data: { role: ['admin', 'user'] }, // Protected route
                loadChildren: () => import('@company/core/home-view/home.routing')
            },
            {
                path: 'about',
                loadChildren: () => import('@company/core/about-view/about.routing') // Public route
            }
        ]
    },
    {
        path: 'admin',
        canActivate: [canActivateAuthRole],
        data: { role: ['admin'] },
        loadChildren: () => import('@company/core/admin-view/admin.routing')
    },
    {
        path: '**',
        redirectTo: '/about'
    },
];