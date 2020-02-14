import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IScorePart } from 'app/shared/model/score-part.model';

type EntityResponseType = HttpResponse<IScorePart>;
type EntityArrayResponseType = HttpResponse<IScorePart[]>;

@Injectable({ providedIn: 'root' })
export class ScorePartService {
  public resourceUrl = SERVER_API_URL + 'api/score-parts';

  constructor(protected http: HttpClient) {}

  create(scorePart: IScorePart): Observable<EntityResponseType> {
    return this.http.post<IScorePart>(this.resourceUrl, scorePart, { observe: 'response' });
  }

  update(scorePart: IScorePart): Observable<EntityResponseType> {
    return this.http.put<IScorePart>(this.resourceUrl, scorePart, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IScorePart>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IScorePart[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
