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

  constructor(private crudService : CrudOperationsService, private fb: FormBuilder) { 

    this.datestring = globdate;
    
    this.rform = this.fb.group({
      worknumber          : new FormControl(),
      NOK                 : new FormControl(),
      emergencycontact    : new FormControl(),
      filename            : new FormControl(),
      file                : new FormControl()
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

  onFileSelected(event)
  {
    const filename: any = document.querySelector('#filename');
    filename.value = <File>event.target.files[0].name;    

    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.rform.get('file').patchValue(file);
    }
   
  }

  submit()
  {
    const formData = new FormData();
    formData.append('worknumber', this.rform.get('worknumber').value);
    formData.append('NOK', this.rform.get('NOK').value);
    formData.append('emergencycontact', this.rform.get('emergencycontact').value);
    formData.append('file', this.rform.get('file').value);

    formData.append('date', moment().tz("Africa/Johannesburg").format());

    
    //this.crudService.updateRequest(`updatedependancieslogs/${globdate}/${globworknumber1}`, formData).subscribe();
    if(globdate == 'null'){

      this.crudService.updateRequest(`updatedependancies/${globworknumber1}`, formData).subscribe();
    }
    else{
      this.crudService.updateRequest(`updatedependancieslogs/${globdate}/${globworknumber1}`, formData).subscribe();
    }
        
  }

 

}