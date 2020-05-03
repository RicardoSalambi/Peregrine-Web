import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-changetraining',
  templateUrl: './changetraining.component.html',
  styleUrls: ['./changetraining.component.scss']
})
export class ChangetrainingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onFileSelected(event){
    console.log(event);
    const file: any = document.querySelector('#filename');
    file.value = <File>event.target.files[0].name;    
  }

}
