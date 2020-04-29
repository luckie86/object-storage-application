import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr'
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from "@angular/forms";
import { StorageServiceModule } from "ngx-webstorage-service";
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from "./app-routing.module";
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from "./core/token.interceptor";
import { NgxUiLoaderModule, NgxUiLoaderHttpModule  } from 'ngx-ui-loader';

import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { BucketsComponent } from './buckets/buckets.component';
import { ngxUiLoaderConfig } from './core/constants/constants';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    BucketsComponent
  ],
  imports: [
    BrowserAnimationsModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderHttpModule.forRoot({ showForeground: true }),
    HttpClientModule,
    ToastrModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    StorageServiceModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
