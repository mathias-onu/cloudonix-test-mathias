import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { IEditPayload, IProduct } from '../interfaces/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  http = inject(HttpClient)

  apiUrl = environment.apiUrl

  constructor() { }

  getProducts(): Observable<HttpResponse<IProduct[]>> {
    return this.http.get<IProduct[]>(`${this.apiUrl}/items`, { observe: 'response' })
  }

  editProduct(productId: number, product: IEditPayload): Observable<HttpResponse<IProduct>> {
    return this.http.patch<IProduct>(`${this.apiUrl}/items/${productId}`, product, { observe: 'response' })
  }

  deleteProduct(id: number): Observable<HttpResponse<any>> {
    return this.http.delete(`${this.apiUrl}/items/${id}`, { observe: 'response' })
  }
}
