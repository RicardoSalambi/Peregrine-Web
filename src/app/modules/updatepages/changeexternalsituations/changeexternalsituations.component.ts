import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'
import { CrudOperationsService } from 'src/app/services/crud-operations.service'
import { globdate, globworknumber1 } from 'src/app/modules/logs/logs.component'

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

    this.crudService.getRequest(`getexternalsituationslogsdetails/${globdate}/${globworknumber1}`).subscribe( data => {
      
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

    
    this.crudService.addRequest('addexternalsituations', formData).subscribe();
        
  }

}
