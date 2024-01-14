import { Component, OnInit, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Router } from '@angular/router'
import { ServiceService } from './service.service';
import { CrudOperationsService } from 'src/app/services/crud-operations.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

//import * as moment from 'moment-timezone';

let vars = false;

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

  alerts = []; 
  alertsStorage = [
    {
      type: 'success',
      message: 'Successful transaction',
    },
    {
      type: 'danger',
      message: 'Oops !! something went wrong',
    }
  ]

  constructor(private router : Router, private service : ServiceService, private dataserver : CrudOperationsService,protected domSanitizer: DomSanitizer,public dialog: MatDialog) { }

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
    const dialogRef =this.dialog.open(TerminateMemberDialog, {
      data: {table: table, id: id}
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log(`table :${table}  id :${id}`);
      if(vars)
      {
        console.log('Terminate activated !');
        this.dataserver.deleteRequest(`terminate${table}/${id}`).subscribe();

        this.alerts[0] = this.alertsStorage[0];

      }
    });

        
  }


  closealert(alert: any) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }

  // terminatedialog()
  // {
  //   this.dialog.open(TerminateMemberDialog);
  // }

}

export let globtable: string='null';
export let globworknumber: string='null';
export let globpage: string='null'


// export let workethic;
// export let puntuality;
// export let teamwork;
// export let initiative;
// export let positivity;

@Component({
  selector: 'terminatemember-dialog',
  templateUrl: './dialog/terminatemember-dialog.html',
  styleUrls: ['./dialog/terminatemember-dialog.scss']
})
export class TerminateMemberDialog {

  constructor(private dataserver : CrudOperationsService,
    public dialogRef: MatDialogRef<TerminateMemberDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
    
  }

  onYesClick(): void {
    
    
    // this.dataserver.deleteRequest(`terminate${this.data.table}/${this.data.id}`/*, formData*/).subscribe(); 

    // console.log(this.data.table);
    vars = true;
    this.dialogRef.close();

    // this.dialogRef.afterClosed().subscribe(result => {
    //   //console.log(`table :${table}  id :${id}`);
    //   if(result)
    //   {
    //     console.log('Terminate activated !');        
    //   }
    // });
       
  }

}