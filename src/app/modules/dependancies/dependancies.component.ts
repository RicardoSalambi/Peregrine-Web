import { Component, OnInit } from '@angular/core';
import { CrudOperationsService } from '../../services/crud-operations.service'

@Component({
  selector: 'app-dependancies',
  templateUrl: './dependancies.component.html',
  styleUrls: ['./dependancies.component.scss']
})
export class DependanciesComponent implements OnInit {

  fd = new FormData();

  constructor(private crudService : CrudOperationsService) { }

  ngOnInit(): void {
  }

  onFileSelected(event){
    console.log(event);
    const file: any = document.querySelector('#filename');
    file.value = <File>event.target.files[0].name;
    /*const file = <File>event.target.files[0];

    //this.fd = new FormData();
    this.fd.append('File',file, file.name);*/

    
  }

  submit()
  {
    //console.log(file);
    this.crudService.addRequest2('/fileupload', this.fd).subscribe();
        
  }

}
