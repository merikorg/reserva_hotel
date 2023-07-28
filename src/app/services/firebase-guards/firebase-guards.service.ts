import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable({
  providedIn: 'root'
})

export class FirebaseGuardsService {

  constructor(
    private router: Router,
    private firebase: FirebaseService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise((resolve, reject) => {
      this.firebase.getStatus().subscribe(user => {
        if (!user) {
          resolve(false);
          reject(false);
          this.router.navigate(['/login']);
        } else {
          resolve(true);
        }
      });
    });
  }

}
