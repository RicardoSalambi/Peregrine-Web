import { Component, OnInit } from '@angular/core';
import { CrudOperationsService } from 'src/app/services/crud-operations.service'
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'

@Component({
  selector: 'app-changememberinformation',
  templateUrl: './changememberinformation.component.html',
  styleUrls: ['./changememberinformation.component.scss']
})
export class ChangememberinformationComponent implements OnInit {

  datas : any;
  public imagePath;
  imgURL: any;
  public message: string;

  rform  : FormGroup;

  constructor(private crudService : CrudOperationsService, private fb: FormBuilder) {
    this.imgURL = 'assets/img/NoProfile.jpg';
   }

  ngOnInit(): void {
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
    //console.log(files); 
    
    
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

    this.crudService.addRequest2('/addmemberdetails', formData).subscribe();

  }

}
