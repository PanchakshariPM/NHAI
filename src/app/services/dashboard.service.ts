import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, retry, catchError } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})

export class DashboardService {

    public _initializeProjectId$: BehaviorSubject<any> = new BehaviorSubject<any>('');
    public _initializeProjectId = this._initializeProjectId$.asObservable();   // asObservable declarations for listening to the

    public _initializeMappingSpec$: BehaviorSubject<any> = new BehaviorSubject<any>('');
    public _initializeMappingSpec = this._initializeMappingSpec$.asObservable();   // asObservable declarations for listening to the

    public mappingFileData: any;

    public endPointAddress = 'http://nhai.jaitra.com:5555';
    public oldEndPointAddress = 'http://nhai.jaitra.com:8000';

    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            // 'Authorization': 'my-auth-token'
        })
    };

    public dashboardStatResponse$: BehaviorSubject<any> = new BehaviorSubject<any>('');
    public dashboardStatResponse = this.dashboardStatResponse$.asObservable();

    public dashboardAlertResponse$: BehaviorSubject<any> = new BehaviorSubject<any>('');
    public dashboardAlertResponse = this.dashboardAlertResponse$.asObservable();

    public dashboardRecommendationResponse$: BehaviorSubject<any> = new BehaviorSubject<any>('');
    public dashboardRecommendationResponse = this.dashboardRecommendationResponse$.asObservable();

    public dashboardTableResponse$: BehaviorSubject<any> = new BehaviorSubject<any>('');
    public dashboardTableResponse = this.dashboardTableResponse$.asObservable();

    public tollPlazaInfoForTable$: BehaviorSubject<any> = new BehaviorSubject<any>('');
    public tollPlazaInfoForTable = this.tollPlazaInfoForTable$.asObservable();

    constructor(private http: HttpClient) { }

    fetchMappingFileData() {
        return this.mappingFileData;
    }

    // Get Dashboard Toll Statistics
    getDashboardStatistics(): Observable<any> {
        //const url = this.endPointAddress + '/dashboard_stats';
        const url = this.oldEndPointAddress + '/avgpastcount';
        return this.http.post<any>(url, {}, this.httpOptions)
            .pipe(
                map((response: any) => {
                    this.dashboardStatResponse$.next(response);
                    //return response;
                }),
            );
    }

    // Get Alerts
    getAlerts(): Observable<any> {
        //const url = this.endPointAddress + '/dashboard_alerts_live';
        const url = this.oldEndPointAddress + '/getNewAlerts';
        //return this.http.post<any>(url, {}, this.httpOptions)
        return this.http.get<any>(url)
            .pipe(
                map((response: any) => {
                    this.dashboardAlertResponse$.next(response);

                }),
            );
    }

    // Get Recommendation
    getRecommendation(): Observable<any> {
        const url = this.oldEndPointAddress + '/getCurrentRecommendation';
        //const url = this.endPointAddress + '/api/labelling/createProject';
        return this.http.post<any>(url, {}, this.httpOptions)
            .pipe(
                map((response: any) => {
                    this.dashboardRecommendationResponse$.next(response);
                }),
            );
    }

    // Get Dashboard Toll Table Data
    getTollTableData(): Observable<any> {
        /* const url = this.endPointAddress + '/dashview_table';
        return this.http.post<any>(url, {}, this.httpOptions) */
        const url = this.oldEndPointAddress + '/getTolldashboard';
        return this.http.get<any>(url)
            .pipe(
                map((response: any) => {
                    this.dashboardTableResponse$.next(response);
                }),
            );
    }

    // Get Individual Toll Data
    getFullTollDetail(): Observable<any> {
        const url = this.endPointAddress + '/api/labelling/createProject';
        return this.http.post<any>(url, '', this.httpOptions)
            .pipe(
                map((response: any) => {
                    return response;
                }),
            );
    }

}
