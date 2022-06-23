import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SolrService {

  constructor(private http: HttpClient) { }

  public getDocuments(query): Observable<any> {
    const url = 'http://localhost:8983/solr/chats/select?fl=*%2Cscore&q.op=OR&q=question%3A(' + query + ')%5E2%20text%3A(' + query + ')&rows=25';
    return this.http.get<any>(url);
  }
}
