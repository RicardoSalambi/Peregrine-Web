import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


const httpOptions = {
  headers : new HttpHeaders({
    'Content-Type' : 'application/json'
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

  getRequest(extension:String){
    return this.http.get(`${this.url}${extension}`);
  }

  putRequest(){
    //this.http.put(this.url, data, httpOptions);
  }

  addRequest(data,urlextension){
    const url = `${this.url}${this.postExtension}${urlextension}`;
    console.log(url);
    return this.http.post(url, data, httpOptions);
  }

  deleteRequest(){

    return this.http.delete(this.url, httpOptions);
  }
}