import { Component, OnInit } from '@angular/core';
//import { Router } from '@angular/router'

@Component({
  selector: 'app-changedependancies',
  templateUrl: './changedependancies.component.html',
  styleUrls: ['./changedependancies.component.scss']
})
export class ChangedependanciesComponent implements OnInit {

  constructor(/*private router : Router*/) { }

  ngOnInit(): void {
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
