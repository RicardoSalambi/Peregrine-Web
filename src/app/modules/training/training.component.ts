import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'
import { CrudOperationsService } from '../../services/crud-operations.service'

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {

  rform  : FormGroup;

  constructor(private crudService : CrudOperationsService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.rform = this.fb.group({
      worknumber           : new FormControl(),
      trainingdescription  : new FormControl(),
      startdate            : new FormControl(),
      enddate              : new FormControl(),
      file                 : new FormControl()
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

    //console.log(data.file);    
    this.crudService.addRequest('addtraining', formData).subscribe();
        
  }

}
