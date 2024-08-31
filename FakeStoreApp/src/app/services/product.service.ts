  import { Injectable } from '@angular/core';
  import { HttpClient } from '@angular/common/http';
  import { Observable } from 'rxjs';

  @Injectable({
    providedIn: 'root',
  })
  export class ProductService {
    private baseUrl: string = 'https://fakestoreapi.com/products';

    constructor(private http: HttpClient) {}

    // Method to fetch all products
    getAllProducts(): Observable<any> {
      return this.http.get<any>(this.baseUrl);
    }

    // Method to fetch a single product by ID
    getProductById(id: number): Observable<any> {
      return this.http.get<any>(`${this.baseUrl}/${id}`);
    }

    // Method to fetch limited number of products
    getLimitedProducts(limit: number): Observable<any> {
      return this.http.get<any>(`${this.baseUrl}?limit=${limit}`);
    }

    // Method to sort products by a specific parameter
    getSortedProducts(sortBy: string): Observable<any> {
      return this.http.get<any>(`${this.baseUrl}?sort=${sortBy}`);
    }

    // Method to fetch all categories
    getAllCategories(): Observable<any> {
      return this.http.get<any>(`${this.baseUrl}/categories`);
    }

    // Method to fetch products in a specific category
    getProductsInCategory(category: string): Observable<any> {
      return this.http.get<any>(`${this.baseUrl}/category/${category}`);
    }

    // Method to add a new product
    addProduct(product: any): Observable<any> {
      return this.http.post<any>(this.baseUrl, product);
    }

    // Method to update a product
    updateProduct(id: number, product: any): Observable<any> {
      return this.http.put<any>(`${this.baseUrl}/${id}`, product);
    }

    // Method to delete a product
    deleteProduct(id: number): Observable<any> {
      return this.http.delete<any>(`${this.baseUrl}/${id}`);
    }
  }
