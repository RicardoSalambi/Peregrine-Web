import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'
import { CrudOperationsService } from 'src/app/services/crud-operations.service'
import { globdate, globworknumber1 } from 'src/app/modules/logs/logs.component'

import * as moment from 'moment-timezone';

@Component({
  selector: 'app-changetraining',
  templateUrl: './changetraining.component.html',
  styleUrls: ['./changetraining.component.scss']
})
export class ChangetrainingComponent implements OnInit {

  rform  : FormGroup;

  datestring: string;

  constructor(private crudService : CrudOperationsService, private fb: FormBuilder) { 

    this.datestring = globdate;
    
    this.rform = this.fb.group({
      worknumber           : new FormControl(),
      trainingdescription  : new FormControl(),
      startdate            : new FormControl(),
      enddate              : new FormControl(),
      filename             : new FormControl(),
      file                 : new FormControl()
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
        trainingdescription  : data[0].trainingdescription,
        startdate            : data[0].startdate,
        enddate              : data[0].enddate,
        filename             : data[0].filename,
        file                 : data[0].file,
      })

    })
    
  }

  onFileSelected(event){

    const trainingcertificates: any = document.querySelector('#trainingcertificates');
    trainingcertificates.value = <File>event.target.files[0].name;

    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.rform.get('file').patchValue(file);
    }
    
  }

  submit()
  {
    const formData = new FormData();
    formData.append('worknumber', this.rform.get('worknumber').value);
    formData.append('trainingdescription', this.rform.get('trainingdescription').value);
    formData.append('startdate', this.rform.get('startdate').value);
    formData.append('enddate', this.rform.get('enddate').value);
    formData.append('file', this.rform.get('file').value);

    formData.append('date', moment().tz("Africa/Johannesburg").format());
 
    if(globdate == 'null'){

      this.crudService.updateRequest(`updatetraining/${globworknumber1}`, formData).subscribe();
    }
    else{
      this.crudService.updateRequest(`updatetraininglogs/${globdate}/${globworknumber1}`, formData).subscribe();
    }
    
        
  }

}
