import { Injectable } from '@angular/core';
import { InjectableQueryableServiceType } from './queryable-api.service';

@Injectable({
  providedIn: 'root',
})
export class JustificationsService implements InjectableQueryableServiceType {
  name = 'This comes from justification service';

  create() {}
  read() {}
  update() {}
  destroy() {}
  query() {}

  constructor() {}
}
