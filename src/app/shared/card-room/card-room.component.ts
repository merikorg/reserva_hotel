import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-card-room',
  templateUrl: './card-room.component.html',
  styleUrls: ['./card-room.component.css']
})

export class CardRoomComponent {
  @Input() nombre = '';
  @Input() descripcion = '';
  @Input() ubicacion = '';
  @Input() disponibilidad = '';
  @Input() tipo = '';
  @Input() costo = '';
  @Input() impuesto = '';
  @Input() id = '';

  //Data Modal
  @Output() nombre_card= new EventEmitter<{nombre:string, id:string}>();

  setDataNombre(nombre:string, id:string){
    this.nombre_card.emit({nombre:nombre, id:id});
  }

}
