import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { map, catchError } from 'rxjs/operators'

// Interface representing a grocery item
export interface GroceryItem {
  name: string
  quantity: number
  _id: string  // Unique id for each grocery item
}

@Injectable({
  providedIn: 'root'  // This service is provided at the root level
})
export class GroceryService {

  private groceries: GroceryItem[] = []

  // Base URL for the API endpoint
  baseURL = "http://localhost:8080/api/groceries"

  constructor(public http: HttpClient) { }

  // Fetch all groceries from the server
  getGroceries(): Observable<GroceryItem[]> {
    console.log("getGroceries (grocery.service.ts)")
    return this.http.get<GroceryItem[]>(this.baseURL).pipe(
      catchError(this.handleError)  
    )
  }

  // Add a new grocery item to the server
  addGrocery(item: GroceryItem): Observable<GroceryItem> {
    console.log(`addGrocery (grocery.service.ts) item: `, item)
    return this.http.post<GroceryItem>(this.baseURL, item).pipe(
      catchError(this.handleError)  
    )
  }
  
  // Update an existing grocery item on the server
  updateGrocery(id: string, item: GroceryItem): Observable<GroceryItem> {
    console.log(`updateGrocery (grocery.service.ts) id: ${id} item: `, item)
    return this.http.put<GroceryItem>(`${this.baseURL}/${id}`, item).pipe(
      catchError(this.handleError)  
    )
  }
  
  // Delete a grocery item from the server
  deleteGrocery(id: string): Observable<{}> {
    console.log(`deleteGrocery (grocery.service.ts) id: ${id}`)
    return this.http.delete(`${this.baseURL}/${id}`).pipe(
      catchError(this.handleError)  
    )
  }

  // Generate a string of grocery items for sharing
  getGroceryListForSharing(): string {
    console.log("getGroceryListForSharing (grocery.service.ts)")
    return this.groceries.map(item => `${item.name} (Quantity: ${item.quantity})`).join('\n')
  }

  // Handle any errors that occur during an HTTP request
  private handleError(error: HttpErrorResponse | any) {
    console.log("handleError (grocery.service.ts)")
    let errMsg: string
    if (error.error instanceof ErrorEvent) {
      errMsg = `An error occurred: ${error.error.message}`
    } else {
      errMsg = `Server returned code: ${error.status}, error message is: ${error.message}`
    }
    return throwError(() => new Error(errMsg))
  }
}