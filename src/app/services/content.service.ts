import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { PortfolioContent } from '../models/content.models';


@Injectable({ providedIn: 'root' })
export class ContentService {

  // Inject HttpClient the right way (new way instead of constructor)
  private http = inject(HttpClient);

  /** Loads `content.json` from public folder once and shares it across subscribers */
  // FYI see https://dev.to/softheartengineer/how-does-sharereplay-works-in-rxjsangular-1moo
  load(): Observable<PortfolioContent> {
    return this.http.get<PortfolioContent>('assets/content.json').pipe(
      map(data => data), // return the data as is (no transformation), can be removed if no transformation is needed
      shareReplay(1) // replay the latest value to new subscribers
    );
  }
}
