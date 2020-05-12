import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'
import { CrudOperationsService } from '../../services/crud-operations.service'

@Component({
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.scss']
})
export class PerformanceComponent implements OnInit {

  rform  : FormGroup;
  numbers: any;
  
  constructor(private crudService : CrudOperationsService, private fb: FormBuilder) { }

  ngOnInit(): void {
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

    //console.log(data.file);    
    this.crudService.addRequest('addperformance', formData).subscribe();
        
  }

}
