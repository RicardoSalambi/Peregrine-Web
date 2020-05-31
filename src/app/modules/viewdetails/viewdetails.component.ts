import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Router } from '@angular/router'
import { ServiceService } from './service.service';
import { CrudOperationsService } from 'src/app/services/crud-operations.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatTableDataSource } from '@angular/material/table';

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

  imgURL: any = 'assets/img/NoProfile.jpg';
  pictures:any;

  displayedColumns: any[] = ['worknumber', 'name', 'surname','department','Buttons'];

  constructor(private router : Router, private service : ServiceService, private dataserver : CrudOperationsService,protected domSanitizer: DomSanitizer) { }

  ngOnInit() {    

    this.dataserver.getRequest('allmembers').subscribe( (data: {name,surname,worknumber,department}[] ) => {


      this.pictures = data;
      this.workers = new MatTableDataSource(data)//data;   

      // this.filteredWorkers = this.myControl.valueChanges.pipe(
      //   startWith(''),
      //   map(value => typeof value === 'string' ? value : value.name),
      //   map(name => name ? this._filter(name) : this.workers.slice())
      // );
      
    })   

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.workers.filter = filterValue.trim().toLowerCase();
  }

  profilepic(worknumber:any)
  {
    //************************************************
    let TYPED_ARRAY = new Uint8Array(/*data[2].imgfile.data*/ this.pictures[this.pictures.findIndex(x => x.worknumber == worknumber)].imgfile.data);
    //const STRING_CHAR = String.fromCharCode.apply(null, TYPED_ARRAY);

    //*********For out of range Error use******
    const STRING_CHAR = TYPED_ARRAY.reduce((data, byte)=> {
      return data + String.fromCharCode(byte);
      }, '')//);
    
    let base64String = btoa(STRING_CHAR);

    this.imgURL = this.domSanitizer.bypassSecurityTrustUrl('data:image/jpg;base64, ' + base64String);

    //************************************************
  }

  getImg(worknumber:any):any
  {         
    
      //************************************************
      let TYPED_ARRAY = new Uint8Array(/*data[2].imgfile.data*/ this.workers[this.workers.findIndex(x => x.worknumber == worknumber)].imgfile.data);
      //const STRING_CHAR = String.fromCharCode.apply(null, TYPED_ARRAY);

      //*********For out of range Error use******
      const STRING_CHAR = TYPED_ARRAY.reduce((data, byte)=> {
        return data + String.fromCharCode(byte);
        }, '')//);
      
      let base64String = btoa(STRING_CHAR);

      /*this.imgURL =*/return this.domSanitizer.bypassSecurityTrustUrl('data:image/jpg;base64, ' + base64String);

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

  viewperf(id:any)
  {
    globworknumber = id;

    this.router.navigate([`${'memberprofile'}`]);    
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

  terminate(table:string,id:any)
  {
    console.log('Terminate Clicked!');
    this.dataserver.deleteRequest(`terminate${table}/${id}`/*, formData*/).subscribe();    
  }

}

export let globtable: string='null';
export let globworknumber: string='null';
export let globpage: string='null'


// export let workethic;
// export let puntuality;
// export let teamwork;
// export let initiative;
// export let positivity;