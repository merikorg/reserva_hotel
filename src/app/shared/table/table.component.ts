import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent {
  @Input() columns: any[] = [];
  @Input() collection: string = '';
  @Output() openModal = new EventEmitter<any>();
  data: any[] = [];

  loading: boolean = false;
  id: string = '';
  viewReserva: boolean = false;

  //alert
  texto: string = "";
  tipo: string = "";
  alert: boolean = false;

  @ViewChild('closeButton') closeButton!: ElementRef;


  constructor(private router: Router, private firebase: FirebaseService) {
    if (this.router.url.includes("reservas")) {
      this.viewReserva = true;
    }
  }

  ngOnInit(): void {
    this.firebase.getStatus().subscribe((user) => {
      const id = user?.uid;
      if(this.collection === 'reservas'){
        this.firebase.getUsers(this.collection).subscribe(data => {
          this.data = this.normalizeData(data);
        })
      }else{
        this.firebase.getColecctionWhere(this.collection, 'user', `${id}`).onSnapshot(onSnapshot => {
          let array: unknown[] = [];
          onSnapshot.docs.forEach(data => {
            array.push((data.data()));
          });
          this.data = this.normalizeData(array);
        })
      }
    });
  }

  deleteItem(id: string) {
    this.firebase.DeleteUSer(id, this.collection).then(() => {
      this.closeButton.nativeElement.click();
      this.texto = "Elemento eliminado con éxito.";
      this.tipo = "success";
      this.alert = true;
      setTimeout(() => {
        this.alert = false;
      }, 3000);
    }).catch(() => {
      this.closeButton.nativeElement.click();
      this.texto = "Error al eliminar el elemento. Intente nuevamente.";
      this.tipo = "danger";
      this.alert = true;
      setTimeout(() => {
        this.alert = false;
      }, 3000);
    });
  }

  changeState(id: string, checkbox: any) {
    let value = checkbox.checked ? 'activo' : 'inactivo';
    this.firebase.updateUser({ estado: value }, id, this.collection).then(() => {
      this.closeButton.nativeElement.click();
      this.texto = "Estado actualizado con éxito.";
      this.tipo = "success";
      this.alert = true;
      setTimeout(() => {
        this.alert = false;
      }, 3000);
    }).catch(() => {
      this.closeButton.nativeElement.click();
      this.texto = "Error al actualizar el estado. Intente nuevamente.";
      this.tipo = "danger";
      this.alert = true;
      setTimeout(() => {
        this.alert = false;
      }, 3000);
    });
  }

  openModalModi(item: any) {
    this.openModal.emit(item);
  }

  getPropertiesOrder(obj: any): string[] {
    return Object.keys(obj);
  }

  normalizeData(data: any[]): any[] {
    // Itera sobre la data y reorganiza los objetos de acuerdo con el orden deseado
    return data.map(item => {
      const normalizedItem: any = {};
      for (const column of this.columns) {
        normalizedItem[column.subtitle] = item[column.subtitle];
      }
      return normalizedItem;
    });
  }


}
