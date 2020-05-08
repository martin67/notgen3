import { IInstrument } from 'app/shared/model/instrument.model';

export interface ISetting {
  id?: number;
  name?: string;
  instruments?: IInstrument[];
}

export class Setting implements ISetting {
  constructor(public id?: number, public name?: string, public instruments?: IInstrument[]) {}
}
