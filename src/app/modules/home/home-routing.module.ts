import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { HotelComponent } from './pages/hotel/hotel.component';
import { RoomComponent } from './pages/room/room.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'hotel', component: HotelComponent },
      { path: 'room/:id/:nombre', component: RoomComponent },
      { path: '', redirectTo: 'hotel' , pathMatch: 'full'},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class HomeRoutingModule { }