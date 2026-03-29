import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(App, {
  providers: [
    provideCharts(withDefaultRegisterables()),
    provideRouter(routes),
    provideHttpClient() 
  ]
})
.catch((err) => console.error(err));