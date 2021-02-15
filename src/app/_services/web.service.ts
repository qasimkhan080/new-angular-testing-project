import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from "@angular/common/http";
import { Observable } from 'rxjs';
import { AppConstant } from '../_constants/app.constants';
import { AccountService } from './account.service';

@Injectable({
    providedIn: 'root'
})

export class WebService {

    constructor(private http: HttpClient, private accountService: AccountService) { }

    getWebData(month,year): Observable<any> {
        const opts = { params: new HttpParams({fromString: `Month=${month}&Year=${year}`}) };
        return this.http.get(AppConstant.API_URL + 'api/web/GetWebData',opts)
    }

    getYearAndMonths(): Observable<any> {
        return this.http.get(AppConstant.API_URL + 'api/web/GetYearAndMonths', { headers: this.accountService.getRequestHeader() })
    }

    getHelpDeskTickets(month,year): Observable<any> {
        const opts = { params: new HttpParams({fromString: `Month=${month}&Year=${year}`}) };
        return this.http.get(AppConstant.API_URL + 'api/web/GetHelpDeskTickets', opts)
    }

    getWebTrendReportData(month,year): Observable<any> {
        const opts = { params: new HttpParams({fromString: `Month=${month}&Year=${year}`}) };
        return this.http.get(AppConstant.API_URL + 'api/web/GetWebTrendReportData', opts)
    }

    getPrivateData(month,year): Observable<any> {
        const opts = { params: new HttpParams({fromString: `Month=${month}&Year=${year}`}) };
        return this.http.get(AppConstant.API_URL + 'api/web/GetWebPrivateData',opts)
    }
}
