import { Component, Input } from '@angular/core';
import {
  QueryableApiService,
  QUERYABLE_API_CONFIG_TOKEN,
  QUERYABLE_API_TOKEN,
} from './queryable-api.service';
import { JustificationsService } from './justifications.service';

@Component({
  selector: 'hello',
  template: `<h1>Hello</h1>`,
  styles: [`h1 { font-family: Lato; }`],
  providers: [
    QueryableApiService,
    {
      provide: QUERYABLE_API_TOKEN,
      useExisting: JustificationsService,
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
  constructor(readonly queryApiService: QueryableApiService) {
    console.log(this.queryApiService.getName());
  }
}
