import { Injectable, Output, EventEmitter } from '@angular/core';


@Injectable({
  providedIn: 'root'
})

export class ServiceService {

  @Output() $stringData : EventEmitter<any> = new EventEmitter();

  constructor() { }

  sendString(settable,setsendId){

    globtable = settable;
    globworknumber = setsendId;

    this.$stringData.emit({'table':settable,'worknumber':setsendId});    

  }



}


export let globtable='null';
export let globworknumber: string='null';
