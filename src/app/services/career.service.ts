import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Career} from '../interfaces/career.interface';

@Injectable({
  providedIn: 'root'
})
export class CareerService {

  constructor(private http: HttpClient) { }

  public getCareers() {
    return this.http.get('/rest/carrera/');
  }

  public getCareer(id: number) {
    return this.http.get('/rest/carrera/' + id);
  }

  public deleteCareer(id: number) {
    return this.http.delete('/rest/carrera/' + id);
  }

  public editCareer(career: Career) {
    return this.http.put('/rest/carrera/' + career.idCarrera, career);
  }

  public createCareer(career: Career) {
    return this.http.post('/rest/carrera/', career);
  }
}
