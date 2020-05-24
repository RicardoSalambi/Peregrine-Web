import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'
import { CrudOperationsService } from 'src/app/services/crud-operations.service'
import { globdate, globworknumber1 } from 'src/app/modules/logs/logs.component'

import * as moment from 'moment-timezone';

@Component({
  selector: 'app-changedisciplinary',
  templateUrl: './changedisciplinary.component.html',
  styleUrls: ['./changedisciplinary.component.scss']
})
export class ChangedisciplinaryComponent implements OnInit {

  rform  : FormGroup;

  datestring: string;

  constructor(private crudService : CrudOperationsService, private fb: FormBuilder) { 

    this.datestring = globdate;
    
    this.rform = this.fb.group({
      worknumber          : new FormControl(),
      MDD                 : new FormControl(),
      filename            : new FormControl(),
      file                : new FormControl(),
      comments            : new FormControl()
    })

   }

  ngOnInit(): void {

    let url;

    if(globdate == 'null'){
      url = `getlatestdisciplinaries/${globworknumber1}`;
      this.datestring = `Current Details : `;
    }
    else{
      url = `getdisciplinarieslogsdetails/${globdate}/${globworknumber1}`
      this.datestring = ``;
    }

    this.crudService.getRequest(url).subscribe( data => {

      this.datestring = this.datestring + data[0].date;
      
      this.rform.setValue({
        worknumber          : data[0].worknumber,
        MDD                 : data[0].MDD,
        filename            : data[0].filename,
        file                : data[0].file,
        comments            : data[0].comments,
      })

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

    formData.append('date', moment().tz("Africa/Johannesburg").format());
 
    if(globdate == 'null'){

      this.crudService.updateRequest(`updatedisciplinaries/${globworknumber1}`, formData).subscribe();
    }
    else{
      this.crudService.updateRequest(`updatedisciplinarieslogs/${globdate}/${globworknumber1}`, formData).subscribe();
    }

  }

}
