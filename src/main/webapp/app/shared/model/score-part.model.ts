import { IScore } from 'app/shared/model/score.model';
import { IInstrument } from 'app/shared/model/instrument.model';

export interface IScorePart {
  id?: number;
  page?: number;
  length?: number;
  comment?: string;
  googleId?: string;
  score?: IScore;
  instrument?: IInstrument;
}

export class ScorePart implements IScorePart {
  constructor(
    public id?: number,
    public page?: number,
    public length?: number,
    public comment?: string,
    public googleId?: string,
    public score?: IScore,
    public instrument?: IInstrument
  ) {}
}
