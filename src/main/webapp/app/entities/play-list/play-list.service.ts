import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPlayList } from 'app/shared/model/play-list.model';

type EntityResponseType = HttpResponse<IPlayList>;
type EntityArrayResponseType = HttpResponse<IPlayList[]>;

@Injectable({ providedIn: 'root' })
export class PlayListService {
  public resourceUrl = SERVER_API_URL + 'api/play-lists';

  constructor(protected http: HttpClient) {}

  create(playList: IPlayList): Observable<EntityResponseType> {
    return this.http.post<IPlayList>(this.resourceUrl, playList, { observe: 'response' });
  }

  update(playList: IPlayList): Observable<EntityResponseType> {
    return this.http.put<IPlayList>(this.resourceUrl, playList, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPlayList>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPlayList[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
