import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { DefaultModule } from './layouts/default/default.module';
import { InsertdetailsComponent } from './modules/insertdetails/insertdetails.component';
import { ViewdetailsComponent } from './modules/viewdetails/viewdetails.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { DependanciesComponent } from './modules/dependancies/dependancies.component';
import { DisciplinaryComponent } from './modules/disciplinary/disciplinary.component';
import { ExternalsituationsComponent } from './modules/externalsituations/externalsituations.component';
import { WorkleaveComponent } from './modules/workleave/workleave.component';
import { TrainingComponent } from './modules/training/training.component';
import { PerformanceComponent } from './modules/performance/performance.component';
//import { DefaultComponent } from './layouts/default/default.component';
//import { DashboardComponent } from './modules/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    InsertdetailsComponent,
    ViewdetailsComponent,

    DependanciesComponent,
    DisciplinaryComponent,
    ExternalsituationsComponent,
    WorkleaveComponent,
    TrainingComponent,
    PerformanceComponent,
    //DefaultComponent,
    //DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DefaultModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    HttpClientModule,
    MatGridListModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
