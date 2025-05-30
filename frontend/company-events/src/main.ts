import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

console.log('Bootstrapping app with config:', appConfig);

bootstrapApplication(AppComponent, appConfig)
  .then(() => console.log('Application bootstrapped successfully'))
  .catch(err => console.error('Error bootstrapping application:', err));