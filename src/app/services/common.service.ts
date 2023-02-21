import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CommonService {
  readonly httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
    }),
};

  constructor(private httpClient: HttpClient,) { }
  getUsers(search:String,currentPage:number,perPage:number){
    return this.httpClient.get<any>(
      `https://api.github.com/search/users?q=${search}&page=${currentPage}&per_page=${perPage}`,
      this.httpOptions
    );
  }

}
