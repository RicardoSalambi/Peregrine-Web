import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-disciplinary',
  templateUrl: './disciplinary.component.html',
  styleUrls: ['./disciplinary.component.scss']
})
export class DisciplinaryComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onFileSelected(event){
    console.log(event);
    const inputNode: any = document.querySelector('#filename');
    inputNode.value = <File>event.target.files[0].name;
    
  }

}
