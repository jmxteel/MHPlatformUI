import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { MaterialModule } from './shared/material.module';
import { DelayRoutingGuard } from './shared/spinner/delay-routing.guard';
import { AuthGuard } from './shared/guards/auth.guard';
import { HttpClientModule } from '@angular/common/http';
import { HttpInterceptorProviders } from './shared/http-interceptor/interceptor-providers';

const routes: Routes = [
  {
    path: 'login',
    canActivate: [DelayRoutingGuard],
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'sign-up',
    canActivate: [DelayRoutingGuard],
    loadChildren: () => import('./sign-up/sign-up.module').then(m => m.SignUpModule)
  },  
  {
    path: 'main',
    loadChildren: () => import('./contactmanager/contactmanager.module').then(m => m.ContactmanagerModule),
     canActivate: [AuthGuard],
    // data: { claimType: 'canAccessCategories' }  
    data: { claimType: 'isAuthenticated' } 
  },
  {
    path: 'demo',
    loadChildren: () => import('./demo/demo.module').then(m => m.DemoModule)
  },
  {
    path: '**',
    redirectTo: 'login'
  }
]

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
  ],
  providers: [HttpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
