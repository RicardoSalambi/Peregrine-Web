import { Component, OnInit } from '@angular/core';
import { CrudOperationsService } from 'src/app/services/crud-operations.service';

@Component({
  selector: 'app-changeworkleave',
  templateUrl: './changeworkleave.component.html',
  styleUrls: ['./changeworkleave.component.scss']
})
export class ChangeworkleaveComponent implements OnInit {

  constructor(private service : CrudOperationsService) { }

  ngOnInit(): void {
  }

  getfile()
  {
    this.service.getfile('getfile').subscribe()
  }

}
