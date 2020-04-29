import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { PostsComponent } from './modules/posts/posts.component';
import { InsertdetailsComponent } from './modules/insertdetails/insertdetails.component';
import { ViewdetailsComponent } from './modules/viewdetails/viewdetails.component';
import { DependanciesComponent } from './modules/dependancies/dependancies.component';
import { DisciplinaryComponent } from './modules/disciplinary/disciplinary.component';
import { ExternalsituationsComponent } from './modules/externalsituations/externalsituations.component';
import { PerformanceComponent } from './modules/performance/performance.component';
import { TrainingComponent } from './modules/training/training.component';
import { WorkleaveComponent } from './modules/workleave/workleave.component';
import { SigninupComponent } from './modules/signinup/signinup.component';


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
      path : 'posts',
      component : PostsComponent
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
    }
  ]

}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
