import { Component, OnInit } from '@angular/core';
import { CrudOperationsService } from '../../services/crud-operations.service'
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'

@Component({
  selector: 'app-insertdetails',
  templateUrl: './insertdetails.component.html',
  styleUrls: ['./insertdetails.component.scss']
})
export class InsertdetailsComponent implements OnInit {

  datas : any;
  public imagePath;
  imgURL: any;
  public message: string;

  rform  : FormGroup;

  constructor(private crudService : CrudOperationsService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.imgURL = 'assets/img/NoProfile.jpg';

    this.rform = this.fb.group({
      worknumber             : new FormControl(),
      skills                 : new FormControl(),
      name                   : new FormControl(),
      position               : new FormControl(),      
      surname                : new FormControl(),
      nationality            : new FormControl(),
      qualification          : new FormControl(),
      gender                 : new FormControl(),
      department            : new FormControl(),
      house                  : new FormControl(),
      //filename               : new FormControl(),
      address                : new FormControl(),
      comments               : new FormControl(),
      file                   : new FormControl()
    })

  }

  

  onImgSelected(files)
  {    
    console.log(files); 
    
    
    if (files.length === 0)
      return;
  
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      //this.message = "Only images are supported.";
      alert('Only images are supported');
      return;
    }

    
  
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }

    //this.rform.get('imgfile').patchValue(files[0]);
  
    
  }

  onFileSelected(event)
  {
    console.log(event);
    const inputNode: any = document.querySelector('#filename');
    inputNode.value = <File>event.target.files[0].name;

    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.rform.get('file').patchValue(file);
    }
    
  }

  submit()
  {
    const formData = new FormData();
    formData.append('worknumber', this.rform.get('worknumber').value);
    formData.append('skills', this.rform.get('skills').value);
    formData.append('name', this.rform.get('name').value);
    formData.append('position', this.rform.get('position').value);

    formData.append('surname', this.rform.get('surname').value);
    formData.append('nationality', this.rform.get('nationality').value);
    formData.append('qualification', this.rform.get('qualification').value);
    formData.append('gender', this.rform.get('gender').value);

    formData.append('department', this.rform.get('department').value);
    formData.append('house', this.rform.get('house').value);
    //formData.append('filename', this.rform.get('filename').value);
    formData.append('address', this.rform.get('address').value);
    formData.append('comments', this.rform.get('comments').value);
    formData.append('file', this.rform.get('file').value);


    //*************************************************************

    this.crudService.addRequest2('/memberdetailsForm', formData).subscribe();

  }

  /*clicking()
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

  }*/

}
