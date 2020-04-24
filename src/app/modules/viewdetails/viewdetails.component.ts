import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-viewdetails',
  templateUrl: './viewdetails.component.html',
  styleUrls: ['./viewdetails.component.scss']
})
export class ViewdetailsComponent implements OnInit {
  workers;
  constructor() { }

  ngOnInit(): void {

    this.workers = [
    {
      name  : 'Ricardo Salambi',
      role  : 'CEO, Owner, Founder, Genius'

    },
    {
      name  : 'Charles Gudza',
      role  : 'Director, Takes orders'

    },
    {
      name  : 'Random',
      role  : 'Employee'

    },
    {
      name  : 'Ricardo Salambi',
      role  : 'CEO, Owner, Founder, Genius'

    },
    {
      name  : 'Charles Gudza',
      role  : 'Director, Takes orders'

    },
    {
      name  : 'Random',
      role  : 'Employee'

    }];

  }

}
