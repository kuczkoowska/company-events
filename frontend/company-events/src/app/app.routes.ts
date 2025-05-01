import { Routes } from '@angular/router';

export const routes: Routes = [ 
    { path: '',
        loadComponent: () => import('./shell/shell.component').then(m => m.ShellComponent),
        children: [
            {
                path: '',
                loadChildren: () => import('./core/home-view/home.routing')
            }
        ]
    },
    {
        path: '**',
        redirectTo: '/'
    },
];
