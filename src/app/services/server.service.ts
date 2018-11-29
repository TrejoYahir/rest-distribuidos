import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  private readonly _url: string;

  constructor() {
    this._url = 'http://localhost:8080/EzjaRestCarrera';
  }

  get url() {
    return this._url;
  }

}
