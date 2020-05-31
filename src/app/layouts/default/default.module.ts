import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { InsertdetailsComponent } from 'src/app/modules/insertdetails/insertdetails.component';
import { ViewdetailsComponent } from 'src/app/modules/viewdetails/viewdetails.component';
import { DependanciesComponent } from 'src/app/modules/dependancies/dependancies.component';
import { DisciplinaryComponent } from 'src/app/modules/disciplinary/disciplinary.component';
import { ExternalsituationsComponent } from 'src/app/modules/externalsituations/externalsituations.component';
import { WorkleaveComponent } from 'src/app/modules/workleave/workleave.component';
import { TrainingComponent } from 'src/app/modules/training/training.component';
import { PerformanceComponent } from 'src/app/modules/performance/performance.component';
import { SigninupComponent } from 'src/app/modules/signinup/signinup.component';
import { ChangedependanciesComponent } from 'src/app/modules/updatepages/changedependancies/changedependancies.component';
import { ChangememberinformationComponent } from 'src/app/modules/updatepages/changememberinformation/changememberinformation.component';
import { ChangedisciplinaryComponent } from 'src/app/modules/updatepages/changedisciplinary/changedisciplinary.component';
import { ChangeexternalsituationsComponent } from 'src/app/modules/updatepages/changeexternalsituations/changeexternalsituations.component';
import { ChangeperformanceComponent } from 'src/app/modules/updatepages/changeperformance/changeperformance.component';
import { ChangeworkleaveComponent } from 'src/app/modules/updatepages/changeworkleave/changeworkleave.component';
import { ChangetrainingComponent } from 'src/app/modules/updatepages/changetraining/changetraining.component';
import { LogsComponent } from 'src/app/modules/logs/logs.component';
import { ViewprofileComponent } from 'src/app/modules/viewprofile/viewprofile.component';

import { SharedModule } from 'src/app/shared/shared.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { HighchartsChartModule } from 'highcharts-angular';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';

import { ChartsModule } from 'ng2-charts';
//import { MatTableDataSource } from '@angular/material/table';




@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    InsertdetailsComponent,
    ViewdetailsComponent,
    DependanciesComponent,
    DisciplinaryComponent,
    ExternalsituationsComponent,
    WorkleaveComponent,
    TrainingComponent,
    PerformanceComponent,
    SigninupComponent,
    ChangedependanciesComponent,
    ChangememberinformationComponent,
    ChangedisciplinaryComponent,
    ChangeexternalsituationsComponent,
    ChangeperformanceComponent,
    ChangeworkleaveComponent,
    ChangetrainingComponent,
    LogsComponent,    
    ViewprofileComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatSidenavModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    HttpClientModule,
    MatGridListModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule,
    HighchartsChartModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatTableModule,    
    ChartsModule
  ]
})
export class DefaultModule { }
