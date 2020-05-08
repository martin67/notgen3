import { IScore } from 'app/shared/model/score.model';

export interface ISong {
  id?: number;
  title?: string;
  subTitle?: string;
  genre?: string;
  composer?: string;
  author?: string;
  arranger?: string;
  year?: number;
  publisher?: string;
  scores?: IScore[];
}

export class Song implements ISong {
  constructor(
    public id?: number,
    public title?: string,
    public subTitle?: string,
    public genre?: string,
    public composer?: string,
    public author?: string,
    public arranger?: string,
    public year?: number,
    public publisher?: string,
    public scores?: IScore[]
  ) {}
}
