import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'
import { CrudOperationsService } from 'src/app/services/crud-operations.service'
import { globdate, globworknumber1 } from 'src/app/modules/logs/logs.component'

@Component({
  selector: 'app-changeperformance',
  templateUrl: './changeperformance.component.html',
  styleUrls: ['./changeperformance.component.scss']
})
export class ChangeperformanceComponent implements OnInit {

  numbers: any;
  rform  : FormGroup;

  datestring: string;

  constructor(private crudService : CrudOperationsService, private fb: FormBuilder) { 

    this.datestring = globdate;

    this.numbers = 
    [
      {number : 0},{number : 10},{number : 20},{number : 30},{number : 40},{number : 50},{number : 60},{number : 70},{number : 80},{number : 90},{number : 100}
    ];

    this.rform = this.fb.group({
      worknumber          : new FormControl(),
      workethic           : new FormControl(),
      puntuality          : new FormControl(),
      teamwork            : new FormControl(),
      initiative          : new FormControl(),
      positivity          : new FormControl(),
      comments            : new FormControl(),
    })

   }

  ngOnInit(): void {

    this.crudService.getRequest(`getperformancelogsdetails/${globdate}/${globworknumber1}`).subscribe( data => {
      
      this.rform.setValue({
        worknumber          : data[0].worknumber,
        workethic           : data[0].workethic,
        puntuality          : data[0].puntuality,
        teamwork            : data[0].teamwork,
        initiative          : data[0].initiative,
        positivity          : data[0].positivity,
        comments            : data[0].comments,
      })

    })
    

  }

  submit()
  {
    const formData = new FormData();
    formData.append('worknumber', this.rform.get('worknumber').value);
    formData.append('workethic', this.rform.get('workethic').value);
    formData.append('puntuality', this.rform.get('puntuality').value);
    formData.append('teamwork', this.rform.get('teamwork').value);
    formData.append('initiative', this.rform.get('initiative').value);
    formData.append('positivity', this.rform.get('positivity').value);
    formData.append('comments', this.rform.get('comments').value);

    this.crudService.addRequest('addperformance', formData).subscribe();
        
  }

}
