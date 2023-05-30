import { Component, Input } from '@angular/core';
import { ICity } from './city';
import {
  QueryableApiService,
  QUERYABLE_API_CONFIG_TOKEN,
  QUERYABLE_API_ENDPOINT_TOKEN,
} from './queryable-api.service';

@Component({
  selector: 'hello',
  templateUrl: 'cities.component.html',
  styles: [`h1 { font-family: Lato; }`],
  providers: [
    QueryableApiService,
    {
      provide: QUERYABLE_API_ENDPOINT_TOKEN,
      useValue: 'https://6089b8b68c8043001757f52f.mockapi.io/cities',
    },
    // config example
    {
      provide: QUERYABLE_API_CONFIG_TOKEN,
      useValue: {
        doThis: true,
        orThat: false,
      },
    },
  ],
})
export class CitiesComponent {
  constructor(readonly api: QueryableApiService<ICity>) {}

  ngOnInit() {}

  search(event) {
    this.api.search$.next({ name: event.target.value });
  }
}
