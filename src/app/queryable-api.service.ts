import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Observable, startWith, Subject } from 'rxjs';
import {
  map,
  distinctUntilChanged,
  shareReplay,
  switchMap,
  debounceTime,
} from 'rxjs/operators';

export type QueryableServiceConfigType = Record<string, any>;
/***/

/** TOKENS */
export const QUERYABLE_API_ENDPOINT_TOKEN = new InjectionToken<string>(
  'QUERYABLE_API_ENDPOINT'
);

export const QUERYABLE_API_CONFIG_TOKEN = new InjectionToken<
  Record<string, QueryableServiceConfigType>
>('QUERYABLE_API_CONFIG');
/***/

/** SERVICE */
@Injectable()
export class QueryableApiService<T = unknown> {
  constructor(
    @Inject(QUERYABLE_API_ENDPOINT_TOKEN)
    private readonly API_ENDPOINT: string,
    @Inject(QUERYABLE_API_CONFIG_TOKEN)
    private readonly config: QueryableServiceConfigType,
    private readonly httpClient: HttpClient
  ) {
    if (this.config) {
      this.setup(this.config);
    }
  }

  private setup(config: QueryableServiceConfigType) {
    console.log('setup', config);
  }

  // crud
  public create() {
    return this.httpClient.get<T[]>(this.API_ENDPOINT);
  }
  public read() {
    return this.httpClient.get<T[]>(this.API_ENDPOINT);
  }
  public update() {
    return this.httpClient.get<T[]>(this.API_ENDPOINT);
  }
  public destroy() {
    return this.httpClient.get<T[]>(this.API_ENDPOINT);
  }

  public query(payload) {
    return this.httpClient.get<T[]>(this.API_ENDPOINT);
  }

  //
  public search$ = new Subject<string>();

  public items$: Observable<T[]> = this.search$.pipe(
    startWith(null),
    debounceTime(600),
    switchMap((searchStr) => {
      if (searchStr) {
        return this.query({ searchStr }).pipe(map(filterBySearch(searchStr)));
      } else {
        return this.read();
      }
    }),
    shareReplay()
  );
}
/***/

// this should be filtered on the api, but we mock it here
function filterBySearch(searchStr) {
  return (results) =>
    results.filter((item: any) =>
      item.name.toLowerCase().includes(searchStr.toLowerCase())
    );
}
