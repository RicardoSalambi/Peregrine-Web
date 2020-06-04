import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'
import { CrudOperationsService } from 'src/app/services/crud-operations.service';
//import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-workleave',
  templateUrl: './workleave.component.html',
  styleUrls: ['./workleave.component.scss']
})
export class WorkleaveComponent implements OnInit {

  rform  : FormGroup;

  alerts:any;

  constructor(private crudService : CrudOperationsService,private formBuilder: FormBuilder,public dialog: MatDialog) { }

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
  }

  submit() {
    const formData = new FormData();
    formData.append('file', this.rform.get('file').value);

    this.crudService.addRequest('add', formData).subscribe();
  }

  close(alert: any) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }

  reset() {

    this.alerts = [
      {
        type: 'success',
        message: 'This is an success alert',
      },
      {
        type: 'danger',
        message: 'This is a danger alert',
      }
    ]

  }


  dialogtest()
  {
    this.dialog.open(WorkHTMLDialog);
  }

}


@Component({
  selector: 'workhtml-dialog',
  templateUrl: './workhtml-dialog.html',
  styleUrls: ['./workhtml-dialog.scss']
})
export class WorkHTMLDialog {}