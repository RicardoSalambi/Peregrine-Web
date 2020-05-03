import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-changememberinformation',
  templateUrl: './changememberinformation.component.html',
  styleUrls: ['./changememberinformation.component.scss']
})
export class ChangememberinformationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onFileSelected(event){
    console.log(event);
    const file: any = document.querySelector('#filename');
    file.value = <File>event.target.files[0].name;    
  }

}
