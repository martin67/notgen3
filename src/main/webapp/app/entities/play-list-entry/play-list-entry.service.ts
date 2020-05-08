import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IPlayListEntry } from 'app/shared/model/play-list-entry.model';

type EntityResponseType = HttpResponse<IPlayListEntry>;
type EntityArrayResponseType = HttpResponse<IPlayListEntry[]>;

@Injectable({ providedIn: 'root' })
export class PlayListEntryService {
  public resourceUrl = SERVER_API_URL + 'api/play-list-entries';

  constructor(protected http: HttpClient) {}

  create(playListEntry: IPlayListEntry): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(playListEntry);
    return this.http
      .post<IPlayListEntry>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(playListEntry: IPlayListEntry): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(playListEntry);
    return this.http
      .put<IPlayListEntry>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IPlayListEntry>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IPlayListEntry[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(playListEntry: IPlayListEntry): IPlayListEntry {
    const copy: IPlayListEntry = Object.assign({}, playListEntry, {
      date: playListEntry.date && playListEntry.date.isValid() ? playListEntry.date.format(DATE_FORMAT) : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.date = res.body.date ? moment(res.body.date) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((playListEntry: IPlayListEntry) => {
        playListEntry.date = playListEntry.date ? moment(playListEntry.date) : undefined;
      });
    }
    return res;
  }
}
