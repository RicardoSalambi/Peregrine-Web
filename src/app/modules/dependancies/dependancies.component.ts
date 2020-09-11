import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'
import { CrudOperationsService } from '../../services/crud-operations.service'

import * as moment from 'moment-timezone';

@Component({
  selector: 'app-dependancies',
  templateUrl: './dependancies.component.html',
  styleUrls: ['./dependancies.component.scss']
})
export class DependanciesComponent implements OnInit {

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

  ngOnInit(): void 
  {
    this.rform = this.fb.group({

      worknumber          : ['',[ Validators.required, Validators.minLength(5), Validators.pattern(/^-?(0|[1-9]\d*)?$/)] ],
      NOK                 : ['',[ Validators.required]],
      emergencycontact    : ['',[ Validators.required]],
      filename            : new FormControl({value: '', disabled: true}, Validators.required),
      file                : ['',[ Validators.required]],

    })
  }

  //********************Getters************************************
  get worknumber(){
    return this.rform.get('worknumber');
  }
  get NOK(){
    return this.rform.get('NOK');
  }
  get emergencycontact(){
    return this.rform.get('emergencycontact');
  }
  get filename(){
    return this.rform.get('filename');
  }
  get file(){
    return this.rform.get('file');
  }
  //********************Getters************************************

  onFileSelected(event)
  {
    /*const filename: any = document.querySelector('#filename');
    filename.value = <File>event.target.files[0].name;    */

    this.rform.get('filename').patchValue(<File>event.target.files[0].name);

    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.rform.get('file').patchValue(file);
    }
   
  }

  closealert(alert: any) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }

  submit()
  {
    const formData = new FormData();
    formData.append('worknumber', this.rform.get('worknumber').value);
    formData.append('NOK', this.rform.get('NOK').value);
    formData.append('emergencycontact', this.rform.get('emergencycontact').value);
    formData.append('filename', this.rform.get('filename').value);
    formData.append('file', this.rform.get('file').value);

    formData.append('date', moment().tz("Africa/Johannesburg").format());

    //console.log(data.file);    
    this.crudService.addRequest('adddependancies', formData).subscribe();
    this.alerts[0] = this.alertsStorage[0];
  }

}
