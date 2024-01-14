import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'
import { CrudOperationsService } from '../../services/crud-operations.service'

import * as moment from 'moment-timezone';

@Component({
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.scss']
})
export class PerformanceComponent implements OnInit {

  rform  : FormGroup;
  numbers: any;

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
  
  constructor(private crudService : CrudOperationsService, private fb: FormBuilder) { }

  ngOnInit(): void {
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
      comments            : new FormControl()

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

    //console.log(data.file);    
    this.crudService.addRequest('addperformance', formData).subscribe();
    this.alerts[0] = this.alertsStorage[0];
        
  }

}
