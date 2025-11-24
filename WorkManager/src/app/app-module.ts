import { ApplicationConfig, NgModule, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule, routes } from './app-routing-module';
import { App } from './app';
import { List } from './clientes/list/list';
import { Add } from './clientes/add/add';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter } from '@angular/router';

 const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes), provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch())
  ]
}
;
@NgModule({
  declarations: [
    App
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    Add
  ],
 

  bootstrap: [App]
  
})
export class AppModule { }
