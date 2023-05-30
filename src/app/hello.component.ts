import { Component, Input } from '@angular/core';
import { ICity } from './city';
import {
  QueryableApiService,
  QUERYABLE_API_CONFIG_TOKEN,
  QUERYABLE_API_ENDPOINT_TOKEN,
} from './queryable-api.service';

@Component({
  selector: 'hello',
  template: `<h1>Hello</h1>

  <form>
  <label> search </label>
  <input (keyup)="search($event)" />
  </form>

  <hr />

  <ol *ngIf="api.items$ | async as items">
    <li *ngFor="let item of items; let i = index">{{item.name}}</li>
  </ol>

  `,
  styles: [`h1 { font-family: Lato; }`],
  providers: [
    QueryableApiService,
    {
      provide: QUERYABLE_API_ENDPOINT_TOKEN,
      useValue: 'https://6089b8b68c8043001757f52f.mockapi.io/cities',
    },
    {
      provide: QUERYABLE_API_CONFIG_TOKEN,
      useValue: {
        doThis: true,
        orThat: false,
      },
    },
  ],
})
export class HelloComponent {
  constructor(readonly api: QueryableApiService<ICity>) {}

  search(event) {
    this.api.search$.next(event.target.value);
  }
}
