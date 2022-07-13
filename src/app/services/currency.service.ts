import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { NbpApiExchangesRatesResult } from '../models/nbp-api';

@Injectable()
export class CurrencyService {
  baseUrl = environment.currencyApiBase;

  constructor(
      private http: HttpClient
    ) { }

  public getLatestExchangeRates(): Observable<NbpApiExchangesRatesResult[]> {
      return this.http.get<NbpApiExchangesRatesResult[]>(`${this.baseUrl}/api/exchangerates/tables/A/?format=json`)
  }

  public getExchangeRatesForDay(date: Date): Observable<NbpApiExchangesRatesResult[]> {

    return this.http.get<NbpApiExchangesRatesResult[]>(`${this.baseUrl}/api/exchangerates/tables/A/${this.getApiDateString(date)}?format=json`)
  }

  private getApiDateString(date: Date) : string {
    let res = '';

    const year = date.getFullYear();
    const month = date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    const day = date.getDate() < 9 ? `0${date.getDate() + 1}` : date.getDate() + 1;  

    return `${year}-${month}-${day}`;
  }

}