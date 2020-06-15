import { Component, OnInit } from '@angular/core';
import { CrudOperationsService } from 'src/app/services/crud-operations.service'
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'
import { globdate, globworknumber1 } from 'src/app/modules/logs/logs.component'
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';

import * as moment from 'moment-timezone';

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

  datestring: string;

  rform  : FormGroup;

  alerts = []; 
  alertsStorage = [
    {
      type: 'success',
      message: 'Successful transaction',
    },
    {
      type: 'danger',
      message: 'Oops !! something went wrong',
    }
  ]

  constructor(private crudService : CrudOperationsService, private fb: FormBuilder,private dataserver : CrudOperationsService,protected domSanitizer: DomSanitizer) {
    this.imgURL = 'assets/img/NoProfile.jpg';

    this.datestring = globdate;

    this.rform = this.fb.group({

      worknumber             : ['',[ Validators.required, Validators.minLength(5), Validators.pattern(/^-?(0|[1-9]\d*)?$/)] ],
      skills                 : new FormControl(),
      name                   : ['',[ Validators.required]],
      position               : ['',[ Validators.required]],      
      surname                : ['',[ Validators.required]],
      nationality            : ['',[ Validators.required]],
      qualification          : ['',[ Validators.required]],
      gender                 : ['',[ Validators.required]],
      department             : ['',[ Validators.required]],
      joiningdate            : ['',[ Validators.required]],
      address                : ['',[ Validators.required]],
      comments               : new FormControl(),
      filename               : new FormControl({value: '', disabled: true}, Validators.required),
      file                   : ['',[ Validators.required]],
      imgfile                : ['',[ Validators.required]],
      mobile                 : ['',[ Validators.required]],
      email                  : ['',[ Validators.required,Validators.pattern(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/)]]

    })

   }

  ngOnInit(): void {

    let url;

    if(globdate == 'null'){
      url = `getlatestperegrineworkers/${globworknumber1}`;
      this.datestring = `Current Details : `;
    }
    else{
      url = `getperegrineworkerslogsdetails/${globdate}/${globworknumber1}`;   
      this.datestring = ``;
    }

    //**************************************************************************
    

    this.dataserver.getRequest(url).subscribe( data => {   
      

      let filearray = new Uint8Array(data[0].file.data);
      let fileblob = new Blob([filearray]);

      let filename = `${data[0].filename}`;      

      let imgarray = new Uint8Array(data[0].imgfile.data);
      let imgblob = new Blob([imgarray]);
      

      this.datestring = this.datestring + data[0].date;

      this.rform.setValue({
      worknumber             : data[0].worknumber,
      skills                 : data[0].skills,
      name                   : data[0].name,
      position               : data[0].position,      
      surname                : data[0].surname,
      nationality            : data[0].nationality,
      qualification          : data[0].qualification,
      gender                 : data[0].gender,
      department             : data[0].department,
      joiningdate            : data[0].joiningdate,
      address                : data[0].address,
      comments               : data[0].comments,
      filename               : data[0].filename,
      file                   : fileblob,
      imgfile                : imgblob,
      mobile                 : data[0].mobile,
      email                  : data[0].email,
      })

      //console.log(data[0].file);

      //************************************************
      let TYPED_ARRAY = new Uint8Array(data[0].imgfile.data);
      //const STRING_CHAR = String.fromCharCode.apply(null, TYPED_ARRAY);

      //*********For out of range Error use******
      const STRING_CHAR = TYPED_ARRAY.reduce((data, byte)=> {
        return data + String.fromCharCode(byte);
        }, '')//);
      
      let base64String = btoa(STRING_CHAR);

      this.imgURL = this.domSanitizer.bypassSecurityTrustUrl('data:image/jpg;base64, ' + base64String);

      //************************************************

    })
  //****************************************************************************

  }

  //**********************Getters*******************************
  get worknumber(){
    return this.rform.get('worknumber');
  }
  get skills(){
    return this.rform.get('skills');
  }
  get name(){
    return this.rform.get('name');
  }
  get position(){
    return this.rform.get('position');
  }
  get surname(){
    return this.rform.get('surname');
  }
  get nationality(){
    return this.rform.get('nationality');
  }
  get qualification(){
    return this.rform.get('qualification');
  }
  get gender(){
    return this.rform.get('gender');
  }
  get department(){
    return this.rform.get('department');
  }
  get joiningdate(){
    return this.rform.get('joiningdate');
  }
  get address(){
    return this.rform.get('address');
  }
  get comments(){
    return this.rform.get('comments');
  }
  get filename(){
    return this.rform.get('filename');
  }
  get file(){
    return this.rform.get('file');
  }
  get imgfile(){
    return this.rform.get('imgfile');
  }
  get mobile(){
    return this.rform.get('mobile');
  }
  get email(){
    return this.rform.get('email');
  }
  //**********************Getters*******************************

  closealert(alert: any) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
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

    this.rform.get('imgfile').patchValue(files[0]);
  
    
  }

  onFileSelected(event)
  {
    //console.log(event);

    /*const inputNode: any = document.querySelector('#filename');
    inputNode.value = <File>event.target.files[0].name;*/

    this.rform.get('filename').patchValue(<File>event.target.files[0].name);

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
    formData.append('joiningdate', this.rform.get('joiningdate').value);
    formData.append('filename', this.rform.get('filename').value);
    formData.append('address', this.rform.get('address').value);
    formData.append('comments', this.rform.get('comments').value);
    formData.append('file', this.rform.get('file').value);
    formData.append('imgfile', this.rform.get('imgfile').value);

    formData.append('mobile', this.rform.get('mobile').value);
    formData.append('email', this.rform.get('email').value);
    
    formData.append('date', moment().tz("Africa/Johannesburg").format());


    //*************************************************************
    if(globdate == 'null'){
      this.crudService.updateRequest(`updateperegrineworkers/${globworknumber1}`, formData).subscribe();
      this.alerts[0] = this.alertsStorage[0];
    }
    else{
      this.crudService.updateRequest(`updateperegrineworkerslogs/${globdate}/${globworknumber1}`, formData).subscribe();
      this.alerts[0] = this.alertsStorage[0];
    }
    

  }

}
