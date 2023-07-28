import { Component } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css']
})

export class HotelComponent {
  searchForm: FormGroup;

  hoteles: any[] = [];
  hoteles_arrray: any[] = [];

  constructor(private firebase: FirebaseService, private formBuilder: FormBuilder) {
    this.getHotel();

    this.searchForm = this.formBuilder.group({
      fechaEntrada: [''],
      fechaSalida: [''],
      cantidad: [''],
      ciudad: [''],
    });
  }

  getHotel() {
    this.firebase.getWhere('hotel','estado','inactivo').get().then(data=>{
      this.hoteles = [];
      data.docs.forEach(data=>{
        this.hoteles.push(data.data());
      });
    });
  }

  searchHotel() {
    const formData = this.searchForm.value;

     const resultadosFiltrados = this.hoteles.filter((hotel: any) => {
    if (formData.fechaEntrada && !this.compareDates(hotel.fechaEntrada, formData.fechaEntrada)) {
      return false;
    }
    if (formData.fechaSalida && !this.compareDates(hotel.fechaSalida, formData.fechaSalida)) {
      return false;
    }
    if (formData.cantidad && hotel.cantidad !== parseInt(formData.cantidad, 10)) {
      return false;
    }
    if (formData.ciudad && hotel.ciudad.toLowerCase() !== formData.ciudad.toLowerCase()) {
      return false;
    }
    return true;
  });

    this.hoteles_arrray = this.hoteles;
    this.hoteles = resultadosFiltrados;
  }

  compareDates(dateString1: string, dateString2: string): boolean {
    const date1 = new Date(dateString1);
    const date2 = new Date(dateString2);
    return date1.toISOString() === date2.toISOString();
  }

  deleteFilter(){
    this.searchForm.reset();
    this.hoteles = this.hoteles_arrray;
  }
}
