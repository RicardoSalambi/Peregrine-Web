import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { PostsComponent } from './modules/posts/posts.component';
import { InsertdetailsComponent } from './modules/insertdetails/insertdetails.component';
import { ViewdetailsComponent } from './modules/viewdetails/viewdetails.component';


const routes: Routes = [{
  path : '',
  component : DefaultComponent,
  children : [
    {
      path : '',
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
    }
  ]

}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
