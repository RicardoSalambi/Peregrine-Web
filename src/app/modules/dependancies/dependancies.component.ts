import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dependancies',
  templateUrl: './dependancies.component.html',
  styleUrls: ['./dependancies.component.scss']
})
export class DependanciesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onFileSelected(event){
    console.log(event);
    const inputNode: any = document.querySelector('#filename');
    inputNode.value = <File>event.target.files[0].name;
    
  }

}
