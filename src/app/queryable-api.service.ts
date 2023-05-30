import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  Observable,
  startWith,
  Subject,
  tap,
} from 'rxjs';
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

  private readonly defaultPagination = {
    page: 1,
    limit: 10,
  };

  // crud methods
  public create() {
    return this.httpClient.get<T[]>(this.API_ENDPOINT);
  }
  public read() {
    return this.httpClient.get<T[]>(this.API_ENDPOINT, {
      params: this.defaultPagination,
    });
  }
  public update() {
    return this.httpClient.get<T[]>(this.API_ENDPOINT);
  }
  public destroy() {
    return this.httpClient.get<T[]>(this.API_ENDPOINT);
  }

  public query(searchObj: object, pagination: object) {
    console.log('calling api');
    return this.httpClient.get<T[]>(this.API_ENDPOINT, {
      params: { ...pagination, ...searchObj },
    });
  }

  // public Observables
  public search$ = new BehaviorSubject<Record<string, string>>(null);
  public pagination$ = new BehaviorSubject<{ page: number; limit: number }>(
    this.defaultPagination
  );

  public items$: Observable<T[]> = combineLatest([
    this.search$.pipe(tap(() => this.pagination$.next(this.defaultPagination))),
    this.pagination$,
  ]).pipe(
    debounceTime(300),
    switchMap(([searchObj, pagination]) => {
      return this.query(searchObj, pagination);
    }),
    shareReplay()
  );

  public itemsCount$ = this.items$.pipe(map((items) => items.length));
}
/***/
