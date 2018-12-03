import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Product } from './shared/product';
import { Post } from './shared/posts';
import { Page } from './shared/pages';
import { Media } from './shared/media';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl1 = 'http://ganny.in/wp-json/wp/v2';
const apiUrl2 = 'http://ganny.in/api/';
export const checkValidity = ( type, id) => {
  console.log('checkValidity ' + type + ' ' + id ); // log to console instead
  let url = apiUrl2;
  let pageField = '';
  if  (type ===  'posts') {
    url += 'get_posts/';
    pageField = 'post_id=';
  } else if  (type ===  'pages') {
    url += 'get_page/';
    pageField = 'id=';
  } else if  (type ===  'portfolio') {
    if  (id !== 'xxx') {
      url += 'get_post/?post_type=portfolio';
    } else {
    url += 'get_posts/?post_type=portfolio';
   }
    pageField = 'id=';
  } else if  (type ===  'service') {
    if  (id !== 'xxx') {
      url += 'get_post/?post_type=service';
    } else {
    url += 'get_posts/?post_type=service';
  } pageField = 'id=';
}
  if  (id !== 'xxx') {
    if (url.includes('?')) {
      url += '&' + pageField + id;
    } else {
    url += '?' + pageField + id;
   }
  }
  console.log('checkValidity ' + url ); // log to console instead
  return url;

};
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  getMedia(id: number): Observable<Media> {
    const url = `${apiUrl1}/media/${id}`;
    return this.http.get<Media>(url).pipe(
      tap(_ => console.log(`fetched media id=${id}`)),
      catchError(this.handleError<Post>(`getMedia id=${id}`))
    );
  }
  getPosts (type: string): Observable<Post[]> {
    const url = checkValidity(type , 'xxx');

    return this.http.get<Post[]>(url)
      .pipe(
        tap(products => console.log('Fetch products')),
        catchError(this.handleError('getPosts', []))
      );
  }

  getPost(id: number, type: string): Observable <Post> {
    const url = checkValidity( id , type);
    return this.http.get<Post>(url).pipe(
      tap(_ => console.log(`;fetched; product; id = $; {id; }`)),
      catchError(this.handleError<Post>(`; getPost; id = $; {id; }`))
    );
  }
  getPage(id: number , type: string): Observable < Page > {
    const url = checkValidity(type , id);
    return this.http.get<Page>(url).pipe(
      tap(_ => console.log(`; fetched; product; id = $; {id; }`)),
      catchError(this.handleError<Page>(`; getPost; id = $; {id; }`))
    );
  }
  getProduct(): Observable < Post > {
    const url = `; $; {apiUrl1; }/products`;
    return this.http.get<Post>(url).pipe(
      tap(_ => console.log(`fetched product }`)),
      catchError(this.handleError<Post>(`getPost `))
    );
  }
  addProduct (product): Observable < Product > {
    return this.http.post<Product>(apiUrl1, product, httpOptions).pipe(
      tap((product: Product) => console.log(`added product w/ id=${product._id}`)),
      catchError(this.handleError<Product>('addProduct'))
    );
  }

  updateProduct (id, product): Observable < any > {
    const url = `${apiUrl1}/${id}`;
    return this.http.put(url, product, httpOptions).pipe(
      tap(_ => console.log(`updated product id=${id}`)),
      catchError(this.handleError<any>('updateProduct'))
    );
  }

  deleteProduct (id): Observable < Product > {
    const url = `${apiUrl1}/${id}`;

    return this.http.delete<Product>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted product id=${id}`)),
      catchError(this.handleError<Product>('deleteProduct'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
