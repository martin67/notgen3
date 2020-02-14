import { IScorePart } from 'app/shared/model/score-part.model';
import { ISong } from 'app/shared/model/song.model';

export interface IScore {
  id?: number;
  name?: string;
  scoreParts?: IScorePart[];
  song?: ISong;
}

export class Score implements IScore {
  constructor(public id?: number, public name?: string, public scoreParts?: IScorePart[], public song?: ISong) {}
}
