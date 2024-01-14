import { Component, OnInit, Output, EventEmitter } from '@angular/core';
//import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSidebarEvent  : EventEmitter<any> = new EventEmitter();
 
  constructor() { }

  ngOnInit(): void {
  }

  toggleSideBar()
  {
    this.toggleSidebarEvent.emit();

    // setTimeout(() => {
    //   window.dispatchEvent(
    //     new Event('resize')
    //   );
    // })


  }

}
