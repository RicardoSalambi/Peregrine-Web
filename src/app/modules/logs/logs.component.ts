import { Component, OnInit } from '@angular/core';
import { CrudOperationsService } from 'src/app/services/crud-operations.service';
import { Router } from '@angular/router'

import { MatTableDataSource } from '@angular/material/table';
//import { ServiceService , globtable , globworknumber } from '../viewdetails/service.service';
import { globtable , globworknumber, globpage } from '../viewdetails/viewdetails.component';


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

  displayedColumns: any[] = ['date','worknumber', 'name', 'surname', 'qualification','department','Buttons'];
  dataSource: any; //= new MatTableDataSource(this.getData());
  data: any;
  


  constructor(private dataserver : CrudOperationsService,private router : Router) { }
 

  ngOnInit(): void {

    let url = `get${globtable}/${globworknumber}/${globtable}`;
    

    //****************************************************************************
      this.dataserver.getRequest(url).subscribe( (data: {date: Date, worknumber: number, name: string, surname: string, qualification: string, department: string }[]) => { 
        
        this.dataSource = new MatTableDataSource(data)

      })
    //****************************************************************************

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onRowClicked(row)
  {
    console.log('Row clicked: ', row);
  }

  currentDetails(){

    globdate = 'null';
    globworknumber1 = globworknumber;
    this.router.navigate([`${globpage}`]);

  }

  click(date,worknumber)
  {
    globdate = date;
    globworknumber1 = worknumber;

    this.router.navigate([`${globpage}`]);
  }

}

export let globdate;
export let globworknumber1;
