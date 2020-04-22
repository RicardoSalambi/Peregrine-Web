import { Component, OnInit } from '@angular/core';
import { CrudOperationsService } from '../../services/crud-operations.service'

@Component({
  selector: 'app-insertdetails',
  templateUrl: './insertdetails.component.html',
  styleUrls: ['./insertdetails.component.scss']
})
export class InsertdetailsComponent implements OnInit {

  datas;

  constructor(private crudService : CrudOperationsService) { }

  ngOnInit(): void {
  }

  onFileSelected(event){
    console.log(event);
    
  }

  clicking()
  {
    alert('Data has been logged on the console');
    
    this.crudService.getRequest('/event').subscribe(data => {
      //console.log(data);
      this.datas = data;
    });

    

    console.log(this.datas);

  }

}
