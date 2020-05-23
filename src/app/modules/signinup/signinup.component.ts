import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-signinup',
  templateUrl: './signinup.component.html',
  styleUrls: ['./signinup.component.scss']
})
export class SigninupComponent implements OnInit {

  constructor(private router : Router) { }

  ngOnInit(): void {
  }

  goToPage(page:String):void
  {        
    //console.log(`${page}`);
    this.router.navigate([`${page}`]);
  }

}
