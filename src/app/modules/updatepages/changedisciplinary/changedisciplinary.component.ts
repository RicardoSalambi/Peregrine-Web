import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'
import { CrudOperationsService } from 'src/app/services/crud-operations.service'

@Component({
  selector: 'app-changedisciplinary',
  templateUrl: './changedisciplinary.component.html',
  styleUrls: ['./changedisciplinary.component.scss']
})
export class ChangedisciplinaryComponent implements OnInit {

  rform  : FormGroup;

  constructor(private crudService : CrudOperationsService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.rform = this.fb.group({
      worknumber          : new FormControl(),
      MDD                 : new FormControl(),
      file                : new FormControl(),
      comments            : new FormControl()
    })
  }

  onFileSelected(event){
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
    formData.append('MDD', this.rform.get('MDD').value);
    formData.append('file', this.rform.get('file').value);
    formData.append('comments', this.rform.get('comments').value);

    //console.log(data.file);    
    this.crudService.addRequest2('/adddisciplinary', formData).subscribe();

  }

}
