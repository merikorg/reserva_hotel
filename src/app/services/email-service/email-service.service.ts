import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class EmailServiceService {

  private sendgridUrl = 'https://servers-development.co/prueba/server/email.php'; 
  private key = "UbKGYtzvENFAvFEwFmJbPNqSAUBphB";

  constructor(private http: HttpClient) {}

  sendEmail(email: string): Observable<any> {
    const data = {
      key: this.key,
      email: email
    };
    return this.http.post<any>(this.sendgridUrl, data);
  }
}
