import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Router } from '@angular/router'
import { ServiceService } from './service.service';

@Component({
  selector: 'app-viewdetails',
  templateUrl: './viewdetails.component.html',
  styleUrls: ['./viewdetails.component.scss']
})
export class ViewdetailsComponent implements OnInit {

  workers;
  myControl = new FormControl();
  filteredWorkers : Observable<string[]>;

  constructor(private router : Router, private service : ServiceService) { }

  ngOnInit(): void {

    

    this.workers = [
    { name  : 'Ricardo Salambi', role  : 'CEO, Owner, Founder, Genius' },
    { name  : 'Charles Gudza', role  : 'Director, Takes orders'},
    { name  : 'Random', role  : 'Employee'},
    { name  : 'Ricardo Salambi', role  : 'CEO, Owner, Founder, Genius' },
    { name  : 'Charles Gudza', role  : 'Director, Takes orders'},
    { name  : 'Random', role  : 'Employee'},
    { name  : 'Ricardo Salambi', role  : 'CEO, Owner, Founder, Genius' },
    { name  : 'Charles Gudza', role  : 'Director, Takes orders'},
    { name  : 'Random', role  : 'Employee'},
    { name  : 'Ricardo Salambi', role  : 'CEO, Owner, Founder, Genius' },
    { name  : 'Charles Gudza', role  : 'Director, Takes orders'},
    { name  : 'Random', role  : 'Employee'},
    { name  : 'Ricardo Salambi', role  : 'CEO, Owner, Founder, Genius' },
    { name  : 'Charles Gudza', role  : 'Director, Takes orders'},
    { name  : 'Random', role  : 'Employee'},
    { name  : 'Ricardo Salambi', role  : 'CEO, Owner, Founder, Genius' },
    { name  : 'Charles Gudza', role  : 'Director, Takes orders'},
    { name  : 'Random', role  : 'Employee'},
    { name  : 'Ricardo Salambi', role  : 'CEO, Owner, Founder, Genius' },
    { name  : 'Charles Gudza', role  : 'Director, Takes orders'},
    { name  : 'Random', role  : 'Employee'},
    { name  : 'Ricardo Salambi', role  : 'CEO, Owner, Founder, Genius' },
    { name  : 'Charles Gudza', role  : 'Director, Takes orders'},
    { name  : 'Random', role  : 'Employee'},
    { name  : 'Ricardo Salambi', role  : 'CEO, Owner, Founder, Genius' },
    { name  : 'Charles Gudza', role  : 'Director, Takes orders'},
    { name  : 'Random', role  : 'Employee'},
    { name  : 'Ricardo Salambi', role  : 'CEO, Owner, Founder, Genius' },
    { name  : 'Charles Gudza', role  : 'Director, Takes orders'},
    { name  : 'Random', role  : 'Employee'},
    { name  : 'Ricardo Salambi', role  : 'CEO, Owner, Founder, Genius' },
    { name  : 'Charles Gudza', role  : 'Director, Takes orders'},
    { name  : 'Random', role  : 'Employee'},
    { name  : 'Ricardo Salambi', role  : 'CEO, Owner, Founder, Genius' },
    { name  : 'Charles Gudza', role  : 'Director, Takes orders'},
    { name  : 'Random', role  : 'Employee'},
    { name  : 'Ricardo Salambi', role  : 'CEO, Owner, Founder, Genius' },
    { name  : 'Charles Gudza', role  : 'Director, Takes orders'},
    { name  : 'Random', role  : 'Employee'},
    { name  : 'Ricardo Salambi', role  : 'CEO, Owner, Founder, Genius' },
    { name  : 'Charles Gudza', role  : 'Director, Takes orders'},
    { name  : 'Random', role  : 'Employee'},
    { name  : 'Ricardo Salambi', role  : 'CEO, Owner, Founder, Genius' },
    { name  : 'Charles Gudza', role  : 'Director, Takes orders'},
    { name  : 'Random', role  : 'Employee'},
    { name  : 'Ricardo Salambi', role  : 'CEO, Owner, Founder, Genius' },
    { name  : 'Charles Gudza', role  : 'Director, Takes orders'},
    { name  : 'Random', role  : 'Employee'},
    { name  : 'Ricardo Salambi', role  : 'CEO, Owner, Founder, Genius' },
    { name  : 'Charles Gudza', role  : 'Director, Takes orders'},
    { name  : 'Random', role  : 'Employee'},
    { name  : 'Ricardo Salambi', role  : 'CEO, Owner, Founder, Genius' },
    { name  : 'Charles Gudza', role  : 'Director, Takes orders'},
    { name  : 'Random', role  : 'Employee'},
    { name  : 'Ricardo Salambi', role  : 'CEO, Owner, Founder, Genius' },
    { name  : 'Charles Gudza', role  : 'Director, Takes orders'},
    { name  : 'Random', role  : 'Employee'},
    { name  : 'Ricardo Salambi', role  : 'CEO, Owner, Founder, Genius' },
    { name  : 'Charles Gudza', role  : 'Director, Takes orders'},
    { name  : 'Random', role  : 'Employee'},
    { name  : 'Ricardo Salambi', role  : 'CEO, Owner, Founder, Genius' },
    { name  : 'Charles Gudza', role  : 'Director, Takes orders'},
    { name  : 'Random', role  : 'Employee'},
    { name  : 'Ricardo Salambi', role  : 'CEO, Owner, Founder, Genius' },
    { name  : 'Charles Gudza', role  : 'Director, Takes orders'},
    { name  : 'Random', role  : 'Employee'},
    { name  : 'Ricardo Salambi', role  : 'CEO, Owner, Founder, Genius' },
    { name  : 'Charles Gudza', role  : 'Director, Takes orders'},
    { name  : 'Random', role  : 'Employee'},
    { name  : 'Ricardo Salambi', role  : 'CEO, Owner, Founder, Genius' },
    { name  : 'Charles Gudza', role  : 'Director, Takes orders'},
    { name  : 'Random', role  : 'Employee'},
    { name  : 'Ricardo Salambi', role  : 'CEO, Owner, Founder, Genius' },
    { name  : 'Charles Gudza', role  : 'Director, Takes orders'},
    { name  : 'Random', role  : 'Employee'},
    { name  : 'Ricardo Salambi', role  : 'CEO, Owner, Founder, Genius' },
    { name  : 'Charles Gudza', role  : 'Director, Takes orders'},
    { name  : 'Random', role  : 'Employee'},
    { name  : 'Ricardo Salambi', role  : 'CEO, Owner, Founder, Genius' },
    { name  : 'Charles Gudza', role  : 'Director, Takes orders'},
    { name  : 'Random', role  : 'Employee'},
    { name  : 'Ricardo Salambi', role  : 'CEO, Owner, Founder, Genius' },
    { name  : 'Charles Gudza', role  : 'Director, Takes orders'},
    { name  : 'Random', role  : 'Employee'},
    { name  : 'Ricardo Salambi', role  : 'CEO, Owner, Founder, Genius' },
    { name  : 'Charles Gudza', role  : 'Director, Takes orders'},
    { name  : 'Random', role  : 'Employee'},
    { name  : 'Ricardo Salambi', role  : 'CEO, Owner, Founder, Genius' },
    { name  : 'Charles Gudza', role  : 'Director, Takes orders'},
    { name  : 'Random', role  : 'Employee'},
    { name  : 'Ricardo Salambi', role  : 'CEO, Owner, Founder, Genius' },
    { name  : 'Charles Gudza', role  : 'Director, Takes orders'},
    { name  : 'Random', role  : 'Employee'},
    { name  : 'Ricardo Salambi', role  : 'CEO, Owner, Founder, Genius' },
    { name  : 'Charles Gudza', role  : 'Director, Takes orders'},
    { name  : 'Random', role  : 'Employee'},
    { name  : 'Ricardo Salambi', role  : 'CEO, Owner, Founder, Genius' },
    { name  : 'Charles Gudza', role  : 'Director, Takes orders'},
    { name  : 'Random', role  : 'Employee'},
    { name  : 'Ricardo Salambi', role  : 'CEO, Owner, Founder, Genius' },
    { name  : 'Charles Gudza', role  : 'Director, Takes orders'},
    { name  : 'Random', role  : 'Employee'},
    { name  : 'Ricardo Salambi', role  : 'CEO, Owner, Founder, Genius' },
    { name  : 'Charles Gudza', role  : 'Director, Takes orders'},
    { name  : 'Random', role  : 'Employee'},
    { name  : 'Ricardo Salambi', role  : 'CEO, Owner, Founder, Genius' },
    { name  : 'Charles Gudza', role  : 'Director, Takes orders'},
    { name  : 'Random', role  : 'Employee'},
    { name  : 'Ricardo Salambi', role  : 'CEO, Owner, Founder, Genius' },
    { name  : 'Charles Gudza', role  : 'Director, Takes orders'},
    { name  : 'Random', role  : 'Employee'},
    { name  : 'Ricardo Salambi', role  : 'CEO, Owner, Founder, Genius' },
    { name  : 'Charles Gudza', role  : 'Director, Takes orders'},
    { name  : 'Random', role  : 'Employee'},
    { name  : 'Ricardo Salambi', role  : 'CEO, Owner, Founder, Genius' },
    { name  : 'Charles Gudza', role  : 'Director, Takes orders'},
    { name  : 'Random', role  : 'Employee'},
    { name  : 'Ricardo Salambi', role  : 'CEO, Owner, Founder, Genius' },
    { name  : 'Charles Gudza', role  : 'Director, Takes orders'},
    { name  : 'Random', role  : 'Employee'},
    { name  : 'Ricardo Salambi', role  : 'CEO, Owner, Founder, Genius' },
    { name  : 'Charles Gudza', role  : 'Director, Takes orders'},
    { name  : 'Random', role  : 'Employee'},
    { name  : 'Ricardo Salambi', role  : 'CEO, Owner, Founder, Genius' },
    { name  : 'Charles Gudza', role  : 'Director, Takes orders'},
    { name  : 'Random', role  : 'Employee'},
    { name  : 'Ricardo Salambi', role  : 'CEO, Owner, Founder, Genius' },
    { name  : 'Charles Gudza', role  : 'Director, Takes orders'},
    { name  : 'Random', role  : 'Employee'},
    { name  : 'Ricardo Salambi', role  : 'CEO, Owner, Founder, Genius' },
    { name  : 'Charles Gudza', role  : 'Director, Takes orders'},
    { name  : 'Random', role  : 'Employee'},
    { name  : 'Ricardo Salambi', role  : 'CEO, Owner, Founder, Genius' },
    { name  : 'Charles Gudza', role  : 'Director, Takes orders'},
    { name  : 'Random', role  : 'Employee'},
    { name  : 'Ricardo Salambi', role  : 'CEO, Owner, Founder, Genius' },
    { name  : 'Charles Gudza', role  : 'Director, Takes orders'},
    { name  : 'Random', role  : 'Employee'},
    { name  : 'Ricardo Salambi', role  : 'CEO, Owner, Founder, Genius' },
    { name  : 'Charles Gudza', role  : 'Director, Takes orders'},
    { name  : 'Random', role  : 'Employee'},
    { name  : 'Ricardo Salambi', role  : 'CEO, Owner, Founder, Genius' },
    { name  : 'Charles Gudza', role  : 'Director, Takes orders'},
    { name  : 'Random', role  : 'Employee'},
    
    
    ];


    this.filteredWorkers = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filter(name) : this.workers.slice())
    );

  }

  private _filter(value: string): string[]
  {
    const filterValue = value.toLowerCase();
    return this.workers.filter(worker => worker.name.toLowerCase().indexOf(filterValue) === 0
    );
  }

  displayfn(subject)
  {
    /*if(subject)
    {
      return subject.name;
    }
    else
    {
      return undefined;
    }*/
    return subject ? subject.name : undefined;
  }

  goToPage(page:String, sendString):void
  {
    this.router.navigate([`${page}`]);

    //****************** Emitter Event *********************
    
    this.service.sendString(sendString);



  }

}
