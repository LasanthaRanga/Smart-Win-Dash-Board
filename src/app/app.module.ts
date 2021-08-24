import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';


import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';

import { MatPaginatorModule } from '@angular/material';
import { OrgchartModule } from '@dabeng/ng-orgchart';
import { AgmCoreModule } from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { CreatePassComponent } from './create-pass/create-pass.component';
import { ForgotPassComponent } from './forgot-pass/forgot-pass.component';
import { BrowserModule } from '@angular/platform-browser';

// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';  

export function tokenGet() {
  return localStorage.getItem('secret');
}

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatTableModule,
    MatPaginatorModule,
    OrgchartModule,
    // NgbModule, 
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    }),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGet,
        allowedDomains: ['https://apiadv.codetechasia.com/'],
        disallowedRoutes: ['http://example.com/examplebadroute/'],
      },
    }),
  ],

  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginPageComponent,
    CreatePassComponent,
    ForgotPassComponent,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
