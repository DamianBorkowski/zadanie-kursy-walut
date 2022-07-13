import { 
  Component, 
  OnInit 
} from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';

import { CurrencyService } from './services/currency.service'; 
import { NbpApiExchangeRatesRate } from './models/nbp-api';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  exchangeRatesList$: Observable<NbpApiExchangeRatesRate[]>;
  filterByDate : Date;

  constructor(
    private currencyService: CurrencyService,
  ) { }

  ngOnInit(): void {
    this.getLatestExchangeRates();
  }

  onFilterByDate(date: Date) {
    this.filterByDate = date;

    this.exchangeRatesList$ = this.currencyService.getExchangeRatesForDay(date).pipe(
      map(res => (res && res[0] && res[0].rates) || []),
      catchError( (e) => {
        alert(`Error retrieving exchange rates for a given date.`);
        return of([]);
      })
    );
  }

  clear(table: Table) {
    table.clear();
    this.getLatestExchangeRates();

  }

  getLatestExchangeRates() {
    this.exchangeRatesList$ = this.currencyService.getLatestExchangeRates().pipe(
      map(res => (res && res[0] && res[0].rates) || [])
    );
  }
}