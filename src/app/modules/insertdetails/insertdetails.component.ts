import { Component, OnInit } from '@angular/core';
import { CrudOperationsService } from '../../services/crud-operations.service'

@Component({
  selector: 'app-insertdetails',
  templateUrl: './insertdetails.component.html',
  styleUrls: ['./insertdetails.component.scss']
})
export class InsertdetailsComponent implements OnInit {

  datas;

  constructor(private crudService : CrudOperationsService) { }

  ngOnInit(): void {
  }

  onFileSelected(event){
    console.log(event);
    const inputNode: any = document.querySelector('#filename');
    inputNode.value = <File>event.target.files[0].name;
    
  }

  clicking()
  {
    const worknumberinputNode: any = document.querySelector('#worknumber');
    const skillsinputNode: any = document.querySelector('#skills');
    const nameinputNode: any = document.querySelector('#name');
    const positioninputNode: any = document.querySelector('#position');
    const surnameinputNode: any = document.querySelector('#surname');
    const nationalityinputNode: any = document.querySelector('#nationality');
    const qualificationinputNode: any = document.querySelector('#qualification');
    const genderinputNode: any = document.querySelector('#gender');
    const departmentsinputNode: any = document.querySelector('#departments');
    const houseinputNode: any = document.querySelector('#house');
    const fileinputNode: any = document.querySelector('#filename');
    const addressinputNode: any = document.querySelector('#address');
    const commentsinputNode: any = document.querySelector('#comments');

    this.datas = [
      {
        worknumber      :  worknumberinputNode.value,
        name            :  nameinputNode.value,
        surname         :  surnameinputNode.value,
        qualification   :  qualificationinputNode.value,
        department      :  departmentsinputNode.value,
        skills          :  skillsinputNode.value,
        position        :  positioninputNode.value,
        nationality     :  nationalityinputNode.value,
        gender          :  genderinputNode.value,
        house           :  houseinputNode.value,
        address         :  addressinputNode.value,
        comments        :  commentsinputNode.value
      }
    ]

    //console.log(this.datas);

    var url = `/${worknumberinputNode.value}/${nameinputNode.value}/${surnameinputNode.value}/${qualificationinputNode.value}/${departmentsinputNode.value}/
    ${skillsinputNode.value}/${positioninputNode.value}/${nationalityinputNode.value}/${genderinputNode.value}/${houseinputNode.value}/${addressinputNode.value}/
    ${commentsinputNode.value}`;
    
    this.crudService.addRequest(this.datas, url).subscribe();

    alert(`Done`);
    
    this.crudService.getRequest('/event').subscribe(data => {
      //console.log(data);
      this.datas = data;
    });

  }

}
