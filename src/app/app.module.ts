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


const routes: Routes = [
  {
    path: 'login',
    canActivate: [DelayRoutingGuard],
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'main',
    loadChildren: () => import('./contactmanager/contactmanager.module').then(m => m.ContactmanagerModule),
    // canActivate: [AuthGuard],
    // data: { claimType: 'canAccessCategories' }  
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
