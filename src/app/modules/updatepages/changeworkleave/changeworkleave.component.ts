import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { CrudOperationsService } from 'src/app/services/crud-operations.service';
import { globdate, globworknumber1 } from 'src/app/modules/logs/logs.component';

import * as moment from 'moment-timezone';

@Component({
  selector: 'app-changeworkleave',
  templateUrl: './changeworkleave.component.html',
  styleUrls: ['./changeworkleave.component.scss']
})
export class ChangeworkleaveComponent implements OnInit {

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

  constructor(private crudService : CrudOperationsService,private formBuilder: FormBuilder) 
  {
    this.datestring = globdate;

      this.rform = this.formBuilder.group({
        worknumber          : ['',[ Validators.required, Validators.minLength(5), Validators.pattern(/^-?(0|[1-9]\d*)?$/)] ],
        description         : new FormControl(),
        startdate           : ['',[ Validators.required]],
        enddate             : ['',[ Validators.required]],
        filename            : new FormControl({value: 'Optional Doctors Certificate', disabled: true}),
        file                : new FormControl()
      })
  }

  ngOnInit(): void {

    let url;

    if(globdate == 'null'){
      url = `getlatesttraining/${globworknumber1}`;
      this.datestring = `Current Details : `;
    }
    else{
      url = `gettraininglogsdetails/${globdate}/${globworknumber1}`;
      this.datestring = ``;
    }

    this.crudService.getRequest(url).subscribe( data => {

      this.datestring = this.datestring + data[0].date;
      
      this.rform.setValue({
        worknumber           : data[0].worknumber,
        description          : data[0].description,
        startdate            : data[0].startdate,
        enddate              : data[0].enddate,
        filename             : data[0].filename,
        file                 : data[0].file,
      })

    })

  }

  //**********************Getters*******************************
  get worknumber(){
    return this.rform.get('worknumber');
  }
  get description(){
    return this.rform.get('description');
  }
  get startdate(){
    return this.rform.get('startdate');
  }
  get enddate(){
    return this.rform.get('enddate');
  }
  get filename(){
    return this.rform.get('filename');
  }
  get file(){
    return this.rform.get('file');
  }
  //**********************Getters*******************************

  closealert(alert: any) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }

  onFileSelected(event)
  {
    this.rform.get('filename').patchValue(<File>event.target.files[0].name);

    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.rform.get('file').patchValue(file);
    }
    
  }

  submit() {
    const formData = new FormData();
    formData.append('worknumber', this.rform.get('worknumber').value);
    formData.append('description', this.rform.get('description').value);
    formData.append('startdate', this.rform.get('startdate').value);
    formData.append('enddate', this.rform.get('enddate').value);

    formData.append('filename', this.rform.get('filename').value);
    formData.append('file', this.rform.get('file').value);

    formData.append('date', moment().tz("Africa/Johannesburg").format());


    //*************************************************************
    if(globdate == 'null'){

      this.crudService.updateRequest(`updatetraining/${globworknumber1}`, formData).subscribe();
      this.alerts[0] = this.alertsStorage[0];
    }
    else{
      this.crudService.updateRequest(`updatetraininglogs/${globdate}/${globworknumber1}`, formData).subscribe();
      this.alerts[0] = this.alertsStorage[0];
    }
  }

}
