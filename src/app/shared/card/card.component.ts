import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})

export class CardComponent {
  @Input() fechaEntrada = '';
  @Input() fechaSalida = '';
  @Input() nombre = '';
  @Input() descripcion = '';
  @Input() cantidad = '';
  @Input() ciudad = '';
  @Input() id = '';

  constructor(private router: Router) {}

  navigateRoom() {
    this.router.navigate(['/room', this.id, this.nombre]);
  }

}
