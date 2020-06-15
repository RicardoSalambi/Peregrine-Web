import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../viewdetails/service.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'
import { CrudOperationsService } from 'src/app/services/crud-operations.service'
import { globdate, globworknumber1 } from 'src/app/modules/logs/logs.component'

import * as moment from 'moment-timezone';

@Component({
  selector: 'app-changedependancies',
  templateUrl: './changedependancies.component.html',
  styleUrls: ['./changedependancies.component.scss']
})
export class ChangedependanciesComponent implements OnInit {

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
    
    this.rform = this.fb.group({
      worknumber          : ['',[ Validators.required, Validators.minLength(5), Validators.pattern(/^-?(0|[1-9]\d*)?$/)] ],
      NOK                 : ['',[ Validators.required]],
      emergencycontact    : ['',[ Validators.required]],
      filename            : new FormControl({value: '', disabled: true}, Validators.required),
      file                : ['',[ Validators.required]],
    })

  }

  ngOnInit(): void {

    let url;

    if(globdate == 'null'){
      url = `getlatestdependancies/${globworknumber1}`;
      this.datestring = `Current Details : `;
    }
    else{
      url = `getdependancieslogsdetails/${globdate}/${globworknumber1}`;    
      this.datestring = ``; 
    }

    this.crudService.getRequest(url).subscribe( data => {

      this.datestring = this.datestring + data[0].date;
      
      this.rform.setValue({
        worknumber        : data[0].worknumber,
        NOK               : data[0].next_of_kin,
        emergencycontact  : data[0].emergencycontact,
        filename          : data[0].filename,
        file              : data[0].file
      })

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

    
    //this.crudService.updateRequest(`updatedependancieslogs/${globdate}/${globworknumber1}`, formData).subscribe();
    if(globdate == 'null'){

      this.crudService.updateRequest(`updatedependancies/${globworknumber1}`, formData).subscribe();
      this.alerts[0] = this.alertsStorage[0];
    }
    else{
      this.crudService.updateRequest(`updatedependancieslogs/${globdate}/${globworknumber1}`, formData).subscribe();
      this.alerts[0] = this.alertsStorage[0];
    }
        
  }

 

}
