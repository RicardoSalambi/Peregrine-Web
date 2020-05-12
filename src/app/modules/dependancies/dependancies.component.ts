import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'
import { CrudOperationsService } from '../../services/crud-operations.service'

@Component({
  selector: 'app-dependancies',
  templateUrl: './dependancies.component.html',
  styleUrls: ['./dependancies.component.scss']
})
export class DependanciesComponent implements OnInit {

  rform  : FormGroup;

  constructor(private crudService : CrudOperationsService, private fb: FormBuilder) { }

  ngOnInit(): void 
  {
    this.rform = this.fb.group({
      worknumber          : new FormControl(),
      NOK                 : new FormControl(),
      emergencycontact    : new FormControl(),
      file                : new FormControl()
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

    //console.log(data.file);    
    this.crudService.addRequest('adddependancies', formData).subscribe();
        
  }

}
