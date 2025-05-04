import { Route } from "@angular/router";
import { EventsViewComponent } from "./events-view.component";

export default [
    {
        path: '',
        component: EventsViewComponent,
    }
] satisfies Route[];
