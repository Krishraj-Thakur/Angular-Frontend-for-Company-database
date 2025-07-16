import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  constructor(private http: HttpClient) {} // Inject HttpClient

  getPurchaseRequests(): Observable<any[]> {
    return this.http.get<any>('https://localhost:7015/api/PurchaseRequest/GetAllRequests');
  }
}
