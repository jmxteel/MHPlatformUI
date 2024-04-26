import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './sign-up.component';
import { FlexModule } from '@angular/flex-layout';

const routes: Routes = [
  { path: '', component: SignUpComponent },
  { path: '**', redirectTo: '' }
]

@NgModule({
  declarations: [
    SignUpComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexModule,
    RouterModule.forChild(routes)
  ]
})
export class SignUpModule { }
