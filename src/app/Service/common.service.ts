import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  constructor(private http: HttpClient) {} // Inject HttpClient
  url='https://localhost:7015/api/PurchaseRequest/';

  getPurchaseRequests(): Observable<any[]> {
    return this.http.get<any>(this.url+'GetAllRequests');
  }

  getPRItemDetails(): Observable<any[]> {
    return this.http.get<any>(this.url+'GetAllTransactions');
  }
   
  postCreateRequest(request: any): Observable<any> {
    return this.http.post<any>(this.url+'CreateRequest', request);
  }
}
