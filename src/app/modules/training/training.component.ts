import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onFileSelected(event){
    console.log(event);
    const inputNode: any = document.querySelector('#trainingcertificates');
    inputNode.value = <File>event.target.files[0].name;
    
  }

}
