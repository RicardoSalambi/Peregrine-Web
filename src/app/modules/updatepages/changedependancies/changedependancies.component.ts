import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../viewdetails/service.service';
//import { Router } from '@angular/router'

@Component({
  selector: 'app-changedependancies',
  templateUrl: './changedependancies.component.html',
  styleUrls: ['./changedependancies.component.scss']
})
export class ChangedependanciesComponent implements OnInit {

  constructor(private service : ServiceService) { }

  ngOnInit(): void {
    this.service.$stringData
    .subscribe(string => {
      
      console.log(string);
      
    })
  }

  onFileSelected(event){
    console.log(event);
    const file: any = document.querySelector('#filename');
    file.value = <File>event.target.files[0].name;    
  }

  /*goToPage(page:String):void
  {        
    console.log(`${page}`);
    this.router.navigate([`${page}`]);
  }*/

}
