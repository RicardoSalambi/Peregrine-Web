import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'
import { CrudOperationsService } from 'src/app/services/crud-operations.service';

@Component({
  selector: 'app-workleave',
  templateUrl: './workleave.component.html',
  styleUrls: ['./workleave.component.scss']
})
export class WorkleaveComponent implements OnInit {

  rform  : FormGroup;

  constructor(private crudService : CrudOperationsService,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.rform = this.formBuilder.group({
      file                : new FormControl()
    })
  }

  click(event){
    console.log(event);

    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.rform.get('file').patchValue(file);
    }
    
    //this.crudService.addRequest2('/add', this.rform.value).subscribe();
  }

  submit() {
    const formData = new FormData();
    formData.append('file', this.rform.get('file').value);

    this.crudService.addRequest('add', formData).subscribe();

    /*this.httpClient.post<any>(this.SERVER_URL, formData).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );*/
  }

}
