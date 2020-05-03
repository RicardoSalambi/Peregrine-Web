import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-changedisciplinary',
  templateUrl: './changedisciplinary.component.html',
  styleUrls: ['./changedisciplinary.component.scss']
})
export class ChangedisciplinaryComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onFileSelected(event){
    console.log(event);
    const file: any = document.querySelector('#filename');
    file.value = <File>event.target.files[0].name;    
  }

}
