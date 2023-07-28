import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedRoutingModule } from './shared-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { CardComponent } from './card/card.component';
import { ButtonUpComponent } from './button-up/button-up.component';
import { CardRoomComponent } from './card-room/card-room.component';
import { AlertComponent } from './alert/alert.component';
import { TableComponent } from './table/table.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    CardComponent,
    ButtonUpComponent,
    CardRoomComponent,
    AlertComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    FormsModule
  ],
  exports: [
    CardComponent,
    FooterComponent,
    NavbarComponent,
    ButtonUpComponent,
    CardRoomComponent,
    AlertComponent,
    TableComponent
  ]
})
export class SharedModule { }
