import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';


@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})

export class ReservasComponent implements OnInit {
  collection: string = 'reservas';

  columns: any[] = [
    { title: 'ID', subtitle: 'id' },
    { title: 'Habitación', subtitle: 'name_habitacion' },
    { title: 'Pago', subtitle: 'pago' },
    { title: 'Medio de Pago', subtitle: 'medio_pago' },
    { title: 'Fecha de Reserva', subtitle: 'fecha_reserva' },
    { title: 'Hotel', subtitle: 'name_hotel' },
  ];

  item: any[] = [];

  @ViewChild('closeButton') closeButton!: ElementRef;

  constructor(private firebase: FirebaseService) { }

  ngOnInit(): void {
  }

  openModal(item: any) {
    console.log(item.id);
    this.firebase.getColecctionWhere('reservas', 'id', item.id).get().then(data => {
      data.docs.forEach(data => {
        this.item.push(data.data());
      });
    });
  }
}
