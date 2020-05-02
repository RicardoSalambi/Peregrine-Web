import { Injectable, EventEmitter } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  $stringData = new EventEmitter();

  constructor() { }

  sendString(queryString){
    
    //console.log(queryString);

    this.$stringData.emit(queryString);
    

  }



}
