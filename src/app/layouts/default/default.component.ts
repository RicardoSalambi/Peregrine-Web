import { Component, OnInit } from '@angular/core';
import { style } from '@angular/animations';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

  sideBarOpen = true;

  constructor() { }

  ngOnInit(): void {
  }

  sideBarToggler()
  {
    this.sideBarOpen = !this.sideBarOpen;

    let shand = document.getElementsByClassName('mat-drawer-content') as HTMLCollectionOf<HTMLElement>;
    
    if(this.sideBarOpen)
    {
      shand[0].style.width = "80vw";
    }
    else
    {
      shand[0].style.width = "100vw";
    }

  }

}
