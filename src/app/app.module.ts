import { BrowserModule } from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';

import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ServerHttpInterceptor} from './interceptors/server.interceptor';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CareerListComponent } from './career-list/career-list.component';

@NgModule({
  declarations: [
    AppComponent,
    CareerListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es-MX' },
    {
      provide: HTTP_INTERCEPTORS
      ,
      useClass: ServerHttpInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
