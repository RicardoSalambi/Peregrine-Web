import { Component, OnInit } from '@angular/core';
import { CrudOperationsService } from 'src/app/services/crud-operations.service';

import {MatTableDataSource} from '@angular/material/table';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {

  displayedColumns: any[] = ['worknumber', 'name', 'surname', 'qualification','Buttons'];
  dataSource: any; //= new MatTableDataSource(this.getData());
  data: any;

  constructor(private dataserver : CrudOperationsService) { 

    //this.dataSource = new MatTableDataSource(this.data);

  }

   

  //getdata: any;


  ngOnInit(): void {
  //****************************************************************************
  this.dataserver.getRequest('getlogs').subscribe( (data: {worknumber: number, name: string, surname: string, qualification: string }[]) => { 
    
    this.dataSource = new MatTableDataSource(data)

  })
  //****************************************************************************

  }

  getData(): any{

    this.dataserver.getRequest('getlogs').subscribe( data => {      

      return data;

    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onRowClicked(row)
  {
    console.log('Row clicked: ', row);
  }


  click(display)
  {
    console.log(display);
    
  }

}
