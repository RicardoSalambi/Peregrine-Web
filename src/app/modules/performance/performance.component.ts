import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.scss']
})
export class PerformanceComponent implements OnInit {
  numbers;
  constructor() { }

  ngOnInit(): void {
    this.numbers = 
    [
      {number : 1},{number : 2},{number : 3},{number : 4},{number : 5},{number : 6},{number : 7},{number : 8},{number : 9},{number : 10}
    ];
  }

}
