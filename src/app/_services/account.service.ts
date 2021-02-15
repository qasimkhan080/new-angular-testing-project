import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class AccountService {

    constructor(private http: HttpClient) { }

    getRequestHeader() {
        return new HttpHeaders({ 'Authorization': 'bearer ' + localStorage.getItem("userToken") });
    }

}
