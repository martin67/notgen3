import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IInstrument } from 'app/shared/model/instrument.model';

type EntityResponseType = HttpResponse<IInstrument>;
type EntityArrayResponseType = HttpResponse<IInstrument[]>;

@Injectable({ providedIn: 'root' })
export class InstrumentService {
  public resourceUrl = SERVER_API_URL + 'api/instruments';

  constructor(protected http: HttpClient) {}

  create(instrument: IInstrument): Observable<EntityResponseType> {
    return this.http.post<IInstrument>(this.resourceUrl, instrument, { observe: 'response' });
  }

  update(instrument: IInstrument): Observable<EntityResponseType> {
    return this.http.put<IInstrument>(this.resourceUrl, instrument, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IInstrument>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IInstrument[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
