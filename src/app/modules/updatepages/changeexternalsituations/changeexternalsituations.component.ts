import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'
import { CrudOperationsService } from 'src/app/services/crud-operations.service'
import { globdate, globworknumber1 } from 'src/app/modules/logs/logs.component'

import * as moment from 'moment-timezone';

@Component({
  selector: 'app-changeexternalsituations',
  templateUrl: './changeexternalsituations.component.html',
  styleUrls: ['./changeexternalsituations.component.scss']
})
export class ChangeexternalsituationsComponent implements OnInit {

  rform  : FormGroup;

  datestring: string;

  constructor(private crudService : CrudOperationsService, private fb: FormBuilder) { 
    
    this.datestring = globdate;

    this.rform = this.fb.group({
      worknumber          : new FormControl(),
      responsiblities     : new FormControl()
    })
  }

  ngOnInit(): void {

    let url;

    if(globdate == 'null'){
      url = `getlatestexternalsituations/${globworknumber1}`;
      this.datestring = `Current Details : `;
    }
    else{
      url = `getexternalsituationslogsdetails/${globdate}/${globworknumber1}`;
      this.datestring = ``;
    }

    this.crudService.getRequest(url).subscribe( data => {

      this.datestring = this.datestring + data[0].date;
      
      this.rform.setValue({
        worknumber          : data[0].worknumber,
        responsiblities     : data[0].responsiblities,
      })

    })
    
  }

  submit()
  {
    const formData = new FormData();
    formData.append('worknumber', this.rform.get('worknumber').value);
    formData.append('responsiblities', this.rform.get('responsiblities').value);

    formData.append('date', moment().tz("Africa/Johannesburg").format());
 
    if(globdate == 'null'){

      this.crudService.updateRequest(`updateexternalsituations/${globworknumber1}`, formData).subscribe();
    }
    else{
      this.crudService.updateRequest(`updateexternalsituationslogs/${globdate}/${globworknumber1}`, formData).subscribe();
    }
        
  }

}
