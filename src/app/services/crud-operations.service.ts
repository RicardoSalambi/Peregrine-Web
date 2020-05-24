import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


const httpOptions = {
  headers : new HttpHeaders({
    'enctype': 'multipart/form-data'
    //'Content-Type' : 'multipart/form-data; boundary=???' //'application/json'//'multipart/form-data; boundary=something'
  })
}

@Injectable({
  providedIn: 'root'
})
export class CrudOperationsService {

  url = 'http://localhost:5000';
  getExtension = '/event';
  postExtension = '/eventplace';

  constructor(private http : HttpClient) { }

  //*************************************************************

  getRequest(extension:String){
    return this.http.get(`${this.url}/${extension}`);
  }


  addRequest(urlextension:string,data:any){

    const url = `${this.url}/${urlextension}`;
    return this.http.post(url, data);
  }

  updateRequest(urlextension:string,data:any){

    const url = `${this.url}/${urlextension}`;
    return this.http.put(url, data);
  }

  deleteRequest(urlextension:string/*,data:any*/){

    const url = `${this.url}/${urlextension}`;
    return this.http.delete(url/*, data*/);
  }

//*************************************************************

  

  putRequest(){
    //this.http.put(this.url, data, httpOptions);
  }

  /*addRequest(data,urlextension){
    const url = `${this.url}${this.postExtension}${urlextension}`;
    console.log(url);
    return this.http.post(url, data);
  }*/

  /*deleteRequest(){

    return this.http.delete(this.url);
  }*/


  getfile(extension:String){
    return this.http.get(`${this.url}/${extension}`);
  }
}