import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Career} from '../interfaces/career.interface';
import {CareerService} from '../services/career.service';

@Component({
  selector: 'app-career-list',
  templateUrl: './career-list.component.html',
  styleUrls: ['./career-list.component.css']
})
export class CareerListComponent implements OnInit {

  @ViewChild('scrollable') scrollable: ElementRef;
  public careerList: Career[];
  public loading: boolean;
  public loadingCreate: boolean;
  public showAddCareer: boolean;
  public career: Career;
  public editBackup: Career;

  constructor(private careerService: CareerService) {
    this.careerList = [];
    this.loading = false;
    this.loadingCreate = false;
    this.showAddCareer = false;
    this.career = {nombreCarrera: null, descripcionCarrera: null};
  }

  ngOnInit() {
    this.fetchCareers();
  }

  fetchCareers() {
    this.loading = true;
    this.careerService.getCareers()
      .subscribe((data: any) => {
        console.log('success', data);
        this.loading = false;
        this.careerList = data;
      }, (error: any) => {
        this.loading = false;
        console.log('error', error);
        alert('Ocurrió un error al cargar la lista de carreras');
      });
  }

  editCareer(career: Career) {
    const data: Career = {
      idCarrera: career.idCarrera,
      nombreCarrera: career.nombreCarrera,
      descripcionCarrera: career.descripcionCarrera
    };
    career.loading = true;
    console.log('send edit data', data);
    this.careerService.editCareer(data)
      .subscribe((response: any) => {
        console.log('success', response);
        career.loading = false;
        career.enableEdit = false;
      }, (error: any) => {
        career.loading = false;
        console.log('error', error);
        alert('Error al editar la carrera');
      });
  }

  toggleEditCareer(career: Career, status: boolean) {
    career.enableEdit = status;
    if (career.enableEdit) {
      for (const c of this.careerList) {
        if (c.idCarrera !== career.idCarrera) {
          c.enableEdit = false;
        }
      }
      this.editBackup = Object.assign({}, career);
    } else {
      console.log('closing', this.editBackup);
      career.nombreCarrera = this.editBackup.nombreCarrera;
      career.descripcionCarrera = this.editBackup.descripcionCarrera;
      this.editBackup = null;
    }
  }

  addCareer(form) {
    console.log('form', form);
    if (form.valid) {
      this.loadingCreate = true;
      this.careerService.createCareer(this.career)
        .subscribe((response: any) => {
          console.log('success', response);
          this.careerList = response;
          this.career.nombreCarrera = null;
          this.career.descripcionCarrera = null;
          this.showAddCareer = false;
        }, (error: any) => {
          console.log('error', error);
          this.loadingCreate = false;
        });
    }
  }

  removeCareer(career: Career) {
    if (confirm('¿Borrar la carrera: ' + career.nombreCarrera + '?')) {
      this.careerService.deleteCareer(career.idCarrera)
        .subscribe((data: any) => {
          console.log('success', data);
          this.careerList = this.careerList.filter(x => x.idCarrera !== career.idCarrera);
        }, (error: any) => {
          console.log('error', error);
          alert('Error al eliminar la carrera seleccionada');
        });
    }
  }

  toggleAddCareer() {
    this.showAddCareer = !this.showAddCareer;
  }
}
