import { Routes } from '@angular/router';

export const routes: Routes = [
    { 
        path: '',
        loadComponent: () => import('./shell/shell.component').then(m => m.ShellComponent),
        children: [
            {
                path: 'events',
                loadChildren: () => import('@company/core/events-view/events.routing').then(m => m.default)
            },
            {
                path: '',
                loadChildren: () => import('@company/core/home-view/home.routing')
            },
        ]
    },
    {
        path: 'admin',
        loadChildren: () => import('@company/core/admin-view/admin.routing')
    },
    {
        path: '**',
        redirectTo: '/'
    },
];