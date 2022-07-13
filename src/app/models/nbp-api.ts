export interface NbpApiExchangesRatesResult {
    effectiveDate: string;
    no: string;
    rates: NbpApiExchangeRatesRate[];
    table: string;
}

export interface NbpApiExchangeRatesRate {
    currency: string;
    code: string,
    mid: number;
}