import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpHeaders, HttpClient } from '@angular/common/http';


const endpointAddress = 'http://nhai.jaitra.com:5555';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class RestService {

  session: any;

  constructor(private http: HttpClient) { }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }


  login(loginRequest) {
    var loginReq = loginRequest;
    return this.http
      .post(endpointAddress + '/login', loginReq, httpOptions)
      .pipe(map(this.extractData), catchError(this.handleError<any>('login')))
  }

  logout(logoutReq) {
    var logoutReq = logoutReq;
    return this.http
      .post(endpointAddress + '/logout', logoutReq, httpOptions)
      .pipe(map(this.extractData), catchError(this.handleError<any>('logout')))
  }

  dashboardcount() {
    return this.http
      .post(endpointAddress + '/dashboardcount', {})
      .pipe(map(this.extractData), catchError(this.handleError<any>('dashboardcount')))
  }


  nhai_api(tollId) {
    var tollId = tollId;
    return this.http
      .post(endpointAddress + '/nhai_api', tollId, httpOptions)
      .pipe(map(this.extractData), catchError(this.handleError<any>('nhaiData')))
  }

  dailygraph(graphInputData) {
    var graphInputData = graphInputData;
    return this.http
      .post('http://nhai.jaitra.com:8000/dailygraph', graphInputData, httpOptions)
      .pipe(map(this.extractData), catchError(this.handleError<any>('dailygraph')))
  }


  dailygraphversion2(graphInputData) {
    var graphInputData = graphInputData;
    return this.http
      .post('http://nhai.jaitra.com:8000/dailygraphversion2', graphInputData, httpOptions)
      .pipe(map(this.extractData), catchError(this.handleError<any>('dailygraphversion2')))
  }


  getgraphs(graphInputData) {
    var graphInputData = graphInputData;
    return this.http
      .post('http://nhai.jaitra.com:8000/getgraphs', graphInputData, httpOptions)
      .pipe(map(this.extractData), catchError(this.handleError<any>('getgraphs')))
  }

  contractor_info(contractorInffo) {
    var contractorInffo = contractorInffo;
    return this.http
      .post('http://nhai.jaitra.com:8000/contractor_info', contractorInffo, httpOptions)
      .pipe(map(this.extractData), catchError(this.handleError<any>('getgraphs')))
  }

  getNewALertPlaza(tollId) {
    var tollId = tollId;
    return this.http
      .post('http://nhai.jaitra.com:8000/getNewALertPlaza', tollId, httpOptions)
      .pipe(map(this.extractData), catchError(this.handleError<any>('getNewALertPlaza')))
  }

  getPlazaRecommendation(tollId) {
    var tollId = tollId;
    return this.http
      .post('http://nhai.jaitra.com:8000/getPlazaRecommendation', tollId, httpOptions)
      .pipe(map(this.extractData), catchError(this.handleError<any>('getPlazaRecommendation')))
  }

  getoldgraphs(graphInputData) {
    var graphInputData = graphInputData;
    return this.http
      .post(endpointAddress + '/getoldgraphs', graphInputData, httpOptions)
      .pipe(map(this.extractData), catchError(this.handleError<any>('getoldgraphs')))
  }

  getAllAlerts() {
    return this.http
      .get(endpointAddress + '/getAllAlerts', {})
      .pipe(map(this.extractData), catchError(this.handleError<any>('getAllAlerts')))
  }

  getPlazaAlerts(tollPlazaId) {
    var plazaAlert = tollPlazaId;
    return this.http
      .post(endpointAddress + '/getPlazaAlerts', plazaAlert, httpOptions)
      .pipe(map(this.extractData), catchError(this.handleError<any>('getPlazaAlerts')))
  }

  dashboardview() {
    return this.http
      .get(endpointAddress + '/dashboardview', {})
      .pipe(map(this.extractData), catchError(this.handleError<any>('dashboardview')))
  }

  getnhaitcm() {
    return this.http
      .post(endpointAddress + '/getnhaitcm', httpOptions)
      .pipe(map(this.extractData), catchError(this.handleError<any>('getnhaitcm')))
  }

  nhai_api_new(tollPlazaId) {
    var plazaAlert = tollPlazaId;
    return this.http
      .post(endpointAddress + '/nhai_api_new', plazaAlert, httpOptions)
      .pipe(map(this.extractData), catchError(this.handleError<any>('nhai_api_new')))
  }

  // Error handler block
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
