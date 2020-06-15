import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'
import { CrudOperationsService } from '../../services/crud-operations.service'

import * as moment from 'moment-timezone';

@Component({
  selector: 'app-externalsituations',
  templateUrl: './externalsituations.component.html',
  styleUrls: ['./externalsituations.component.scss']
})
export class ExternalsituationsComponent implements OnInit {

  rform  : FormGroup;

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
    this.rform = this.fb.group({
      worknumber          : ['',[ Validators.required, Validators.minLength(5), Validators.pattern(/^-?(0|[1-9]\d*)?$/)] ],
      responsiblities     : ['',[ Validators.required]]
    })
  }

  //********************Getters************************************
  get worknumber(){
    return this.rform.get('worknumber');
  }
  get responsiblities(){
    return this.rform.get('responsiblities');
  }
  //********************Getters************************************

  closealert(alert: any) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }

  submit()
  {
    const formData = new FormData();
    formData.append('worknumber', this.rform.get('worknumber').value);
    formData.append('responsiblities', this.rform.get('responsiblities').value);

    formData.append('date', moment().tz("Africa/Johannesburg").format());

    //console.log(data.file);    
    this.crudService.addRequest('addexternalsituations', formData).subscribe();
    this.alerts[0] = this.alertsStorage[0];
        
  }

}
