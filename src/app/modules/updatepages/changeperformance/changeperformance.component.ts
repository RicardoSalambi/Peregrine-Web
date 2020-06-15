import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'
import { CrudOperationsService } from 'src/app/services/crud-operations.service'
import { globdate, globworknumber1 } from 'src/app/modules/logs/logs.component'

import * as moment from 'moment-timezone';

@Component({
  selector: 'app-changeperformance',
  templateUrl: './changeperformance.component.html',
  styleUrls: ['./changeperformance.component.scss']
})
export class ChangeperformanceComponent implements OnInit {

  numbers: any;
  rform  : FormGroup;

  datestring: string;

  alerts = []; 
  alertsStorage = [
    {
      type: 'success',
      message: 'Successful transaction',
    },
    {
      type: 'danger',
      message: 'Oops !! something went wrong',
    }
  ]

  constructor(private crudService : CrudOperationsService, private fb: FormBuilder) { 

    this.datestring = globdate;

    this.numbers = 
    [
      {number : 0},{number : 10},{number : 20},{number : 30},{number : 40},{number : 50},{number : 60},{number : 70},{number : 80},{number : 90},{number : 100}
    ];

    this.rform = this.fb.group({
      worknumber          : ['',[ Validators.required, Validators.minLength(5), Validators.pattern(/^-?(0|[1-9]\d*)?$/)] ],
      workethic           : ['',[ Validators.required]],
      puntuality          : ['',[ Validators.required]],
      teamwork            : ['',[ Validators.required]],
      initiative          : ['',[ Validators.required]],
      positivity          : ['',[ Validators.required]],
      comments            : new FormControl(),
    })

   }

  ngOnInit(): void {

    let url;

    if(globdate == 'null'){
      url = `getlatestperformance/${globworknumber1}`;
      this.datestring = `Current Details : `;
    }
    else{
      url = `getperformancelogsdetails/${globdate}/${globworknumber1}`;
      this.datestring = ``;
    }

    this.crudService.getRequest(url).subscribe( data => {

      this.datestring = this.datestring + data[0].date;
      
      this.rform.setValue({
        worknumber          : data[0].worknumber,
        workethic           : data[0].workethic,
        puntuality          : data[0].puntuality,
        teamwork            : data[0].teamwork,
        initiative          : data[0].initiative,
        positivity          : data[0].positivity,
        comments            : data[0].comments,
      })

    })
    

  }

  //********************Getters************************************
  get worknumber(){
    return this.rform.get('worknumber');
  }
  get workethic(){
    return this.rform.get('workethic');
  }
  get puntuality(){
    return this.rform.get('puntuality');
  }
  get teamwork(){
    return this.rform.get('teamwork');
  }
  get initiative(){
    return this.rform.get('initiative');
  }
  get positivity(){
    return this.rform.get('positivity');
  }
  get comments(){
    return this.rform.get('comments');
  }
  //********************Getters*************************************

  closealert(alert: any) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }

  submit()
  {
    const formData = new FormData();
    formData.append('worknumber', this.rform.get('worknumber').value);
    formData.append('workethic', this.rform.get('workethic').value);
    formData.append('puntuality', this.rform.get('puntuality').value);
    formData.append('teamwork', this.rform.get('teamwork').value);
    formData.append('initiative', this.rform.get('initiative').value);
    formData.append('positivity', this.rform.get('positivity').value);
    formData.append('comments', this.rform.get('comments').value);

    formData.append('date', moment().tz("Africa/Johannesburg").format());
 
    if(globdate == 'null'){

      this.crudService.updateRequest(`updateperformance/${globworknumber1}`, formData).subscribe();
      this.alerts[0] = this.alertsStorage[0];
    }
    else{
      this.crudService.updateRequest(`updateperformancelogs/${globdate}/${globworknumber1}`, formData).subscribe();
      this.alerts[0] = this.alertsStorage[0];
    }
        
  }

}
