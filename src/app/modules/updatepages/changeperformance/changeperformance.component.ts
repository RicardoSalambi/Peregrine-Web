import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-changeperformance',
  templateUrl: './changeperformance.component.html',
  styleUrls: ['./changeperformance.component.scss']
})
export class ChangeperformanceComponent implements OnInit {

  numbers: any;

  constructor() { }

  ngOnInit(): void {
    this.numbers = 
    [
      {number : 10},{number : 20},{number : 30},{number : 40},{number : 50},{number : 60},{number : 70},{number : 80},{number : 90},{number : 100}
    ];
  }

}
