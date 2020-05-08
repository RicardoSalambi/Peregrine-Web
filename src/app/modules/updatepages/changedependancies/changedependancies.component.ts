import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../viewdetails/service.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'
import { CrudOperationsService } from 'src/app/services/crud-operations.service'
//import { Router } from '@angular/router'

@Component({
  selector: 'app-changedependancies',
  templateUrl: './changedependancies.component.html',
  styleUrls: ['./changedependancies.component.scss']
})
export class ChangedependanciesComponent implements OnInit {

  rform  : FormGroup;

  constructor(private service : ServiceService,private crudService : CrudOperationsService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.service.$stringData.subscribe(string => {      
      console.log(string);      
    })

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
    this.crudService.addRequest2('/adddependancies', formData).subscribe();
        
  }

 

}
