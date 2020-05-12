import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'
import { CrudOperationsService } from '../../services/crud-operations.service'

@Component({
  selector: 'app-externalsituations',
  templateUrl: './externalsituations.component.html',
  styleUrls: ['./externalsituations.component.scss']
})
export class ExternalsituationsComponent implements OnInit {

  rform  : FormGroup;

  constructor(private crudService : CrudOperationsService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.rform = this.fb.group({
      worknumber          : new FormControl(),
      responsiblities     : new FormControl()
    })
  }

  submit()
  {
    const formData = new FormData();
    formData.append('worknumber', this.rform.get('worknumber').value);
    formData.append('responsiblities', this.rform.get('responsiblities').value);

    //console.log(data.file);    
    this.crudService.addRequest('addexternalsituations', formData).subscribe();
        
  }

}
