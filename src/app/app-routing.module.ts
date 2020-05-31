import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { InsertdetailsComponent } from './modules/insertdetails/insertdetails.component';
import { ViewdetailsComponent } from './modules/viewdetails/viewdetails.component';
import { DependanciesComponent } from './modules/dependancies/dependancies.component';
import { DisciplinaryComponent } from './modules/disciplinary/disciplinary.component';
import { ExternalsituationsComponent } from './modules/externalsituations/externalsituations.component';
import { PerformanceComponent } from './modules/performance/performance.component';
import { TrainingComponent } from './modules/training/training.component';
import { WorkleaveComponent } from './modules/workleave/workleave.component';
import { SigninupComponent } from './modules/signinup/signinup.component';
import { ChangedependanciesComponent } from './modules/updatepages/changedependancies/changedependancies.component';
import { ChangememberinformationComponent } from 'src/app/modules/updatepages/changememberinformation/changememberinformation.component';
import { ChangedisciplinaryComponent } from 'src/app/modules/updatepages/changedisciplinary/changedisciplinary.component';
import { ChangeexternalsituationsComponent } from 'src/app/modules/updatepages/changeexternalsituations/changeexternalsituations.component';
import { ChangeperformanceComponent } from 'src/app/modules/updatepages/changeperformance/changeperformance.component';
import { ChangeworkleaveComponent } from 'src/app/modules/updatepages/changeworkleave/changeworkleave.component';
import { ChangetrainingComponent } from 'src/app/modules/updatepages/changetraining/changetraining.component';
import { LogsComponent } from 'src/app/modules/logs/logs.component';
import { ViewprofileComponent } from 'src/app/modules/viewprofile/viewprofile.component';


const routes: Routes = [
{ path : 'signinup', component : SigninupComponent },
{
  path : '',
  component : DefaultComponent,
  children : [
    {
      path : 'dashboard',
      component : DashboardComponent
    },
    {
      path : 'insertdetails',
      component : InsertdetailsComponent
    },
    {
      path : 'viewdetails',
      component : ViewdetailsComponent
    },
    {
      path : 'dependancies',
      component : DependanciesComponent
    },
    {
      path : 'disciplinary',
      component : DisciplinaryComponent
    },
    {
      path : 'externalsituations',
      component : ExternalsituationsComponent
    },
    {
      path : 'performance',
      component : PerformanceComponent
    },
    {
      path : 'training',
      component : TrainingComponent
    },
    {
      path : 'workleave',
      component : WorkleaveComponent
    },
    //*****************************************************************
    {
      path : 'changememberinformation',
      component : ChangememberinformationComponent
    },
    {
      path : 'changedependancies',
      component : ChangedependanciesComponent
    },
    {
      path : 'changedisciplinary',
      component : ChangedisciplinaryComponent
    },
    {
      path : 'changeexternalsituations',
      component : ChangeexternalsituationsComponent
    },
    {
      path : 'changeperformance',
      component : ChangeperformanceComponent
    },
    {
      path : 'changeworkleave',
      component : ChangeworkleaveComponent
    },
    {
      path : 'changetraining',
      component : ChangetrainingComponent
    },    
    {
      path : 'logs',
      component : LogsComponent
    },
    {
      path : 'memberprofile',
      component : ViewprofileComponent
    },
  ]

}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
