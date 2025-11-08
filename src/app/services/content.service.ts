import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { PortfolioContent } from '../models/content.models';


@Injectable({ providedIn: 'root' })
export class ContentService {

  private http = inject(HttpClient);

  /** Loads `content.json` from public folder once and shares it across subscribers */
  load(): Observable<PortfolioContent> {
    return this.http.get<PortfolioContent>('assets/content.json').pipe(
      map(v => v),
      shareReplay(1)
    );
  }
}
