import { Component, OnInit } from '@angular/core';
import { CrudOperationsService } from '../../services/crud-operations.service'
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms'

import * as moment from 'moment-timezone';

@Component({
  selector: 'app-insertdetails',
  templateUrl: './insertdetails.component.html',
  styleUrls: ['./insertdetails.component.scss']
})
export class InsertdetailsComponent implements OnInit {

  rform  : FormGroup;

  datas : any;
  public imagePath;
  imgURL: any;
  public message: string;

  nationalities: any;

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

  constructor(private crudService : CrudOperationsService, private fb: FormBuilder) {
    this.imgURL = 'assets/img/NoProfile.jpg';
    this.nationalities = [
      {nation : 'Afghan'},
      {nation : 'Albanian'},
      {nation : 'Algerian'},
      {nation : 'American'},
      {nation : 'Andorran'},
      {nation : 'Angolan'},
      {nation : 'Antiguans'},
      {nation : 'Argentinean'},
      {nation : 'Armenian'},
      {nation : 'Australian'},
      {nation : 'Austrian'},
      {nation : 'Azerbaijani'},
      {nation : 'Bahamian'},
      {nation : 'Bahraini'},
      {nation : 'Bangladeshi'},
      {nation : 'Barbadian'},
      {nation : 'Barbudans'},
      {nation : 'Batswana'},
      {nation : 'Belarusian'},
      {nation : 'Belgian'},
      {nation : 'Belizean'},
      {nation : 'Beninese'},
      {nation : 'Bhutanese'},
      {nation : 'Bolivian'},
      {nation : 'Bosnian'},
      {nation : 'Brazilian'},
      {nation : 'British'},
      {nation : 'Bruneian'},
      {nation : 'Bulgarian'},
      {nation : 'Burkinabe'},
      {nation : 'Burmese'},
      {nation : 'Burundian'},
      {nation : 'Cambodian'},
      {nation : 'Cameroonian'},
      {nation : 'Canadian'},
      {nation : 'Cape Verdean'},
      {nation : 'Central African'},
      {nation : 'Chadian'},
      {nation : 'Chilean'},
      {nation : 'Chinese'},
      {nation : 'Colombian'},
      {nation : 'Comoran'},
      {nation : 'Congolese'},
      {nation : 'Costa Rican'},
      {nation : 'Croatian'},
      {nation : 'Cuban'},
      {nation : 'Cypriot'},
      {nation : 'Czech'},
      {nation : 'Danish'},
      {nation : 'Djibouti'},
      {nation : 'Dominican'},
      {nation : 'Dutch'},
      {nation : 'East Timorese'},
      {nation : 'Ecuadorean'},
      {nation : 'Egyptian'},
      {nation : 'Emirian'},
      {nation : 'Equatorial Guinean'},
      {nation : 'Eritrean'},
      {nation : 'Estonian'},
      {nation : 'Ethiopian'},
      {nation : 'Fijian'},
      {nation : 'Filipino'},
      {nation : 'Finnish'},
      {nation : 'French'},
      {nation : 'Gabonese'},
      {nation : 'Gambian'},
      {nation : 'Georgian'},
      {nation : 'German'},
      {nation : 'Ghanaian'},
      {nation : 'Greek'},
      {nation : 'Grenadian'},
      {nation : 'Guatemalan'},
      {nation : 'Guinea-Bissauan'},
      {nation : 'Guinean'},
      {nation : 'Guyanese'},
      {nation : 'Haitian'},
      {nation : 'Herzegovinian'},
      {nation : 'Honduran'},
      {nation : 'Hungarian'},
      {nation : 'I-Kiribati'},
      {nation : 'Icelander'},
      {nation : 'Indian'},
      {nation : 'Indonesian'},
      {nation : 'Iranian'},
      {nation : 'Iraqi'},
      {nation : 'Irish'},
      {nation : 'Israeli'},
      {nation : 'Italian'},
      {nation : 'Ivorian'},
      {nation : 'Jamaican'},
      {nation : 'Japanese'},
      {nation : 'Jordanian'},
      {nation : 'Kazakhstani'},
      {nation : 'Kenyan'},
      {nation : 'Kittian and Nevisian'},
      {nation : 'Kuwaiti'},
      {nation : 'Kyrgyz'},
      {nation : 'Laotian'},
      {nation : 'Latvian'},
      {nation : 'Lebanese'},
      {nation : 'Liberian'},
      {nation : 'Libyan'},
      {nation : 'Liechtensteiner'},
      {nation : 'Lithuanian'},
      {nation : 'Luxembourger'},
      {nation : 'Macedonian'},
      {nation : 'Malagasy'},
      {nation : 'Malawian'},
      {nation : 'Malaysian'},
      {nation : 'Maldivian'},
      {nation : 'Malian'},
      {nation : 'Maltese'},
      {nation : 'Marshallese'},
      {nation : 'Mauritanian'},
      {nation : 'Mauritian'},
      {nation : 'Mexican'},
      {nation : 'Micronesian'},
      {nation : 'Moldovan'},
      {nation : 'Monacan'},
      {nation : 'Mongolian'},
      {nation : 'Moroccan'},
      {nation : 'Mosotho'},
      {nation : 'Motswana'},
      {nation : 'Mozambican'},
      {nation : 'Namibian'},
      {nation : 'Nauruan'},
      {nation : 'Nepalese'},
      {nation : 'New Zealander'},
      {nation : 'Ni-Vanuatu'},
      {nation : 'Nicaraguan'},
      {nation : 'Nigerian'},
      {nation : 'Nigerien'},
      {nation : 'North Korean'},
      {nation : 'Northern Irish'},
      {nation : 'Norwegian'},
      {nation : 'Omani'},
      {nation : 'Pakistani'},
      {nation : 'Palauan'},
      {nation : 'Panamanian'},
      {nation : 'Papua New Guinean'},
      {nation : 'Paraguayan'},
      {nation : 'Peruvian'},
      {nation : 'Polish'},
      {nation : 'Portuguese'},
      {nation : 'Qatari'},
      {nation : 'Romanian'},
      {nation : 'Russian'},
      {nation : 'Rwandan'},
      {nation : 'Saint Lucian'},
      {nation : 'Salvadoran'},
      {nation : 'Samoan'},
      {nation : 'San Marinese'},
      {nation : 'Sao Tomean'},
      {nation : 'Saudi'},
      {nation : 'Scottish'},
      {nation : 'Senegalese'},
      {nation : 'Serbian'},
      {nation : 'Seychellois'},
      {nation : 'Sierra Leonean'},
      {nation : 'Singaporean'},
      {nation : 'Slovakian'},
      {nation : 'Slovenian'},
      {nation : 'Solomon Islander'},
      {nation : 'Somali'},
      {nation : 'South African'},
      {nation : 'South Korean'},
      {nation : 'Spanish'},
      {nation : 'Sri Lankan'},
      {nation : 'Sudanese'},
      {nation : 'Surinamer'},
      {nation : 'Swazi'},
      {nation : 'Swedish'},
      {nation : 'Swiss'},
      {nation : 'Syrian'},
      {nation : 'Taiwanese'},
      {nation : 'Tajik'},
      {nation : 'Tanzanian'},
      {nation : 'Thai'},
      {nation : 'Togolese'},
      {nation : 'Tongan'},
      {nation : 'Trinidadian or Tobagonian'},
      {nation : 'Tunisian'},
      {nation : 'Turkish'},
      {nation : 'Tuvaluan'},
      {nation : 'Ugandan'},
      {nation : 'Ukrainian'},
      {nation : 'Uruguayan'},
      {nation : 'Uzbekistani'},
      {nation : 'Venezuelan'},
      {nation : 'Vietnamese'},
      {nation : 'Welsh'},
      {nation : 'Yemenite'},
      {nation : 'Zambian'},
      {nation : 'Zimbabwean'}
    ];
   }

  ngOnInit(): void {

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
      this.imgURL = reader.result; //Preview image
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
    formData.append('address', this.rform.get('address').value);
    formData.append('comments', this.rform.get('comments').value);
    formData.append('filename', this.rform.get('filename').value);
    formData.append('file', this.rform.get('file').value);
    formData.append('imgfile', this.rform.get('imgfile').value);

    formData.append('mobile', this.rform.get('mobile').value);
    formData.append('email', this.rform.get('email').value);
    
    formData.append('date', moment().tz("Africa/Johannesburg").format());


    //*************************************************************

    this.crudService.addRequest('addmemberdetails', formData).subscribe();

    this.alerts[0] = this.alertsStorage[0];

  }

}
