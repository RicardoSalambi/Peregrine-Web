import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'
import { CrudOperationsService } from '../../services/crud-operations.service'

import * as moment from 'moment-timezone';

@Component({
  selector: 'app-disciplinary',
  templateUrl: './disciplinary.component.html',
  styleUrls: ['./disciplinary.component.scss']
})
export class DisciplinaryComponent implements OnInit {

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
      MDD                 : ['',[ Validators.required]],
      filename            : new FormControl({value: '', disabled: true}, Validators.required),
      file                : ['',[ Validators.required]],
      comments            : new FormControl()
    })
  }

  //********************Getters************************************
  get worknumber(){
    return this.rform.get('worknumber');
  }
  get MDD(){
    return this.rform.get('MDD');
  }
  get comments(){
    return this.rform.get('comments');
  }
  get filename(){
    return this.rform.get('filename');
  }
  get file(){
    return this.rform.get('file');
  }
  //********************Getters************************************

  closealert(alert: any) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }

  onFileSelected(event){

    /*const filename: any = document.querySelector('#filename');
    filename.value = <File>event.target.files[0].name;*/

    this.rform.get('filename').patchValue(<File>event.target.files[0].name);

    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.rform.get('file').patchValue(file);
    }
    
  }


  submit()
  {

    const formData = new FormData();
    
    formData.append('worknumber', this.rform.get('worknumber').value);
    formData.append('MDD', this.rform.get('MDD').value);
    formData.append('filename', this.rform.get('filename').value);
    formData.append('file', this.rform.get('file').value);
    formData.append('comments', this.rform.get('comments').value);

    formData.append('date', moment().tz("Africa/Johannesburg").format());

    //console.log(data.file);    
    this.crudService.addRequest('adddisciplinary', formData).subscribe();
    this.alerts[0] = this.alertsStorage[0];


  }


}
