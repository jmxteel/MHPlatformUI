import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactmanagerAppComponent } from './contactmanager-app.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';

import { MaterialModule } from '../shared/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { DelayRoutingGuard } from '../shared/spinner/delay-routing.guard';
import { InstallationContentComponent } from './components/installation-content/installation-content.component';
import { ReportsContentComponent } from './components/reports-content/reports-content.component';
import { AccessRightsContentComponent } from './components/access-rights-content/access-rights-content.component';
import { ExceptionMessageComponent } from '../shared/messaging/exception-message.component';
import { ContentLoaderComponent } from './components/content-loader/content-loader.component';
import { MessagingModule } from '../shared/messaging/messaging.module';
import { AgGridModule } from 'ag-grid-angular';
// import { RemoteGridBindingDirective } from './components/installation-content/remote-grid-binding.directive';
import { ProductionContentComponent } from './components/production-content/production-content.component';
import { CamelCasePipe } from '../shared/custom-pipe/camel-case.pipe';
import { ForScheduleComponent } from './components/installation-content/for-schedule/for-schedule.component';
import { ScheduledComponent } from './components/installation-content/scheduled/scheduled.component';
import { OnGoingComponent } from './components/installation-content/on-going/on-going.component';
import { OnHoldComponent } from './components/installation-content/on-hold/on-hold.component';
import { CellMenuRendererComponent } from './components/installation-content/cell-menu-renderer/cell-menu-renderer.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [DelayRoutingGuard],
    component: ContactmanagerAppComponent,
    children: [
      { path: '', component: MainContentComponent },
      { path: 'reports', component: ReportsContentComponent },
      { path: 'access-rights', component: AccessRightsContentComponent },
      { path: 'installation', component: InstallationContentComponent },
      { path: 'production', component: ProductionContentComponent },
    ]
  },  
  { path: '**', redirectTo: '' }
]

@NgModule({
  declarations: [
    ContactmanagerAppComponent,
    ToolbarComponent,
    MainContentComponent,
    SidenavComponent,
    InstallationContentComponent,
    ReportsContentComponent,
    AccessRightsContentComponent,
    //ExceptionMessageComponent,
    ContentLoaderComponent,
    // RemoteGridBindingDirective,
    ProductionContentComponent,
    CamelCasePipe,
    ForScheduleComponent,
    ScheduledComponent,
    OnGoingComponent,
    OnHoldComponent,
    CellMenuRendererComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    MessagingModule,
    AgGridModule,
    RouterModule.forChild(routes)
  ]
})
export class ContactmanagerModule { }
