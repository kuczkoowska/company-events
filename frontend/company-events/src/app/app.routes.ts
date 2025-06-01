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
                path: 'rooms',
                canActivate: [canActivateAuthRole],
                data: { role: ['admin', 'user'] }, // Protected route
                loadChildren: () => import('@company/core/home-view/home.routing').then(m => m.default)
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
    loadComponent: () => import('@company/core/admin-view/admin-view.component').then(m => m.AdminViewComponent),
    // children: [
    //   {
    //     path: 'signups',
    //     loadComponent: () => import('./core/admin-view/signups/signups.component').then(m => m.SignupsComponent)
    //   },
    //   {
    //     path: 'past-events',
    //     loadComponent: () => import('./core/admin-view/past-events/past-events.component').then(m => m.PastEventsComponent)
    //   },
    //   {
    //     path: 'upcoming-events',
    //     loadComponent: () => import('./core/admin-view/upcoming-events/upcoming-events.component').then(m => m.UpcomingEventsComponent)
    //   },
    //   {
    //     path: 'create-event',
    //     loadComponent: () => import('./core/admin-view/create-event/create-event.component').then(m => m.CreateEventComponent)
    //   },
    //   {
    //     path: 'edit-event',
    //     loadComponent: () => import('./core/admin-view/edit-event/edit-event.component').then(m => m.EditEventComponent)
    //   }
    // ]
  },
    {
        path: '**',
        redirectTo: '/about'
    },
];
