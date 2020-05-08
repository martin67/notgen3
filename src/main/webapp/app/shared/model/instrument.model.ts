import { IScorePart } from 'app/shared/model/score-part.model';
import { ISetting } from 'app/shared/model/setting.model';

export interface IInstrument {
  id?: number;
  name?: string;
  scoreParts?: IScorePart[];
  settings?: ISetting[];
}

export class Instrument implements IInstrument {
  constructor(public id?: number, public name?: string, public scoreParts?: IScorePart[], public settings?: ISetting[]) {}
}
