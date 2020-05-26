import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Router } from '@angular/router'
import { ServiceService } from './service.service';
import { CrudOperationsService } from 'src/app/services/crud-operations.service';
import { DomSanitizer } from '@angular/platform-browser';

//import * as moment from 'moment-timezone';

@Component({
  selector: 'app-viewdetails',
  templateUrl: './viewdetails.component.html',
  styleUrls: ['./viewdetails.component.scss']
})
export class ViewdetailsComponent implements OnInit {

  workers: any;
  myControl = new FormControl();
  filteredWorkers : Observable<string[]>;

  imgURL: any;

  constructor(private router : Router, private service : ServiceService, private dataserver : CrudOperationsService,protected sanitizer: DomSanitizer) { }

  ngOnInit() {    

    this.dataserver.getRequest('allmembers').subscribe( data => {
      
      this.workers = data;   

      this.filteredWorkers = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.workers.slice())
      );
      
    })

    

    // this.workers = [
    // { name  : 'Ricardo Salambi', role  : 'CEO, Owner, Founder, Genius' },
    // { name  : 'Charles Gudza', role  : 'Director, Takes orders'},
    // { name  : 'Random', role  : 'Employee'},
    // { name  : 'Ricardo Salambi', role  : 'CEO, Owner, Founder, Genius' },
    // { name  : 'Charles Gudza', role  : 'Director, Takes orders'},
    // { name  : 'Random', role  : 'Employee'},  
    // ];

    // this.filteredWorkers = this.myControl.valueChanges.pipe(
    //   startWith(''),
    //   map(value => typeof value === 'string' ? value : value.name),
    //   map(name => name ? this._filter(name) : this.workers.slice())
    // );

    

  }

  getImg(worknumber:any):any
  {   
      console.log(worknumber);
    
      //************************************************
      let TYPED_ARRAY = new Uint8Array(/*data[2].imgfile.data*/worknumber);
      //const STRING_CHAR = String.fromCharCode.apply(null, TYPED_ARRAY);

      //*********For out of range Error use******
      const STRING_CHAR = TYPED_ARRAY.reduce((data, byte)=> {
        return data + String.fromCharCode(byte);
        }, '')//);
      
      let base64String = btoa(STRING_CHAR);

      /*this.imgURL =*/return this.sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64, ' + base64String);

      //************************************************
  }

  private _filter(value: string): string[]
  {
    const filterValue = value.toLowerCase();
    return this.workers.filter(worker => worker.name.toLowerCase().indexOf(filterValue) === 0
    );
  }

  displayfn(subject)
  {    
    /*if(subject){  return subject.name;  }
    else{ return undefined; }*/
    return subject ? subject.name : undefined;
  }





  goToPage(table:string, sendId , page:string):void
  {
    this.router.navigate([`${'logs'}`]);

    //****************** Emitter Event *********************
    
    //this.service.sendString(table,sendId);
    globtable = table;
    globworknumber = sendId;
    globpage = page;
  }

}

export let globtable: string='null';
export let globworknumber: string='null';
export let globpage: string='null'