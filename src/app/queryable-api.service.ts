import { Inject, Injectable, InjectionToken } from '@angular/core';

/** TYPES */
export interface InjectableQueryableServiceType {
  name: string;
  create(): void;
  read(): void;
  update(): void;
  destroy(): void;
  query(): void;
}
export type QueryableServiceConfigType = Record<string, any>;
/***/

/** TOKENS */
export const QUERYABLE_API_TOKEN =
  new InjectionToken<InjectableQueryableServiceType>('QUERYABLE_API');

export const QUERYABLE_API_CONFIG_TOKEN = new InjectionToken<
  Record<string, QueryableServiceConfigType>
>('QUERYABLE_API_CONFIG');
/***/

/** SERVICE */
@Injectable()
export class QueryableApiService {
  constructor(
    @Inject(QUERYABLE_API_TOKEN)
    private readonly myInjectedService: InjectableQueryableServiceType,
    @Inject(QUERYABLE_API_CONFIG_TOKEN)
    private readonly config: QueryableServiceConfigType
  ) {
    if (config) {
      this.setup(config);
    }
  }

  private setup(config: QueryableServiceConfigType) {
    // throw new Error('Method not implemented.');
  }

  public getName() {
    return this.myInjectedService.name;
  }
}
/***/
